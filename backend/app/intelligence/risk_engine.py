from datetime import datetime, timedelta
from typing import Dict, List
from app.models.task import Task
from app.models.task_dependency import TaskDependency


def _task_is_complete(task: Task) -> bool:
    return bool(task.status and task.status.lower() in {"completed", "done", "closed"})


def _normalize_priority(priority: str) -> str:
    return (priority or "").strip().lower()


def _severity_from_score(score: float) -> str:
    if score >= 80:
        return "critical"
    if score >= 60:
        return "high"
    if score >= 30:
        return "moderate"
    return "low"


def calculate_task_risk(
    task: Task,
    dependency_map: Dict[int, List[int]],
    tasks_by_id: Dict[int, Task],
) -> Dict[str, object]:
    score = 0
    warnings = []
    now = datetime.utcnow()
    completed = _task_is_complete(task)

    if not completed:
        if task.deadline:
            if task.deadline < now:
                score += 40
                warnings.append("Task is overdue.")
            elif task.deadline <= now + timedelta(days=3):
                score += 20
                warnings.append("Task deadline is approaching.")
            elif task.deadline <= now + timedelta(days=7):
                score += 10

        priority = _normalize_priority(task.priority)
        if priority in {"high", "urgent", "critical"}:
            score += 20
            warnings.append("High-priority incomplete task.")
        elif priority == "medium":
            score += 8

        dependencies = dependency_map.get(task.id, [])
        unresolved = [tasks_by_id[dep_id] for dep_id in dependencies if dep_id in tasks_by_id and not _task_is_complete(tasks_by_id[dep_id])]
        if unresolved:
            score += 20
            warnings.append("Task has unresolved dependencies.")
            if len(unresolved) > 1:
                warnings.append(f"{len(unresolved)} prerequisite tasks remain incomplete.")

        if task.status and task.status.lower() == "blocked":
            score += 10
            warnings.append("Task is explicitly blocked.")

    normalized = min(score, 100)
    severity = _severity_from_score(normalized)

    return {
        "task_id": task.id,
        "project_id": task.project_id,
        "risk_score": normalized,
        "severity": severity,
        "warnings": warnings,
    }


def analyze_project_risk(
    project_tasks: List[Task],
    dependencies: List[TaskDependency],
) -> Dict[str, object]:
    tasks_by_id = {task.id: task for task in project_tasks}
    dependency_map = {
        dep.task_id: [] for dep in dependencies
    }
    for dep in dependencies:
        dependency_map.setdefault(dep.task_id, []).append(dep.depends_on_task_id)

    task_risks = [calculate_task_risk(task, dependency_map, tasks_by_id) for task in project_tasks]
    total_tasks = len(task_risks)
    average_risk = sum(item["risk_score"] for item in task_risks) / total_tasks if total_tasks else 0
    high_risks = [item for item in task_risks if item["risk_score"] >= 60]
    warning = "" if not high_risks else f"{len(high_risks)} high-risk task(s) detected."

    return {
        "project_id": project_tasks[0].project_id if project_tasks else None,
        "task_count": total_tasks,
        "average_risk_score": round(average_risk, 1),
        "severity": _severity_from_score(average_risk),
        "high_risk_tasks": high_risks,
        "summary": warning,
    }
