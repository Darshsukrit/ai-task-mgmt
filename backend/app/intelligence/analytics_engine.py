from typing import Dict, List
from collections import defaultdict
from app.models.project import Project
from app.models.task import Task


def analyze_project_health(projects: List[Project], tasks: List[Task]) -> Dict[str, object]:
    projects_by_id = {project.id: project for project in projects}
    task_groups = defaultdict(list)
    for task in tasks:
        if task.project_id in projects_by_id:
            task_groups[task.project_id].append(task)

    project_health = []
    for project in projects:
        project_tasks = task_groups.get(project.id, [])
        total = len(project_tasks)
        completed = sum(1 for task in project_tasks if task.status and task.status.lower() in {"completed", "done", "closed"})
        completion_rate = round((completed / total) * 100, 1) if total else 0.0
        project_health.append({
            "project_id": project.id,
            "title": project.title,
            "completion_rate": completion_rate,
            "task_count": total,
            "status": project.status,
        })

    return {
        "project_count": len(projects),
        "overall_completion_rate": round(sum(item["completion_rate"] for item in project_health) / max(len(project_health), 1), 1),
        "project_health": project_health,
    }


def analyze_workflow_efficiency(tasks: List[Task], dependency_summary: Dict[str, object]) -> Dict[str, object]:
    total = len(tasks)
    closed = sum(1 for task in tasks if task.status and task.status.lower() in {"completed", "done", "closed"})
    completion_rate = round((closed / max(total, 1)) * 100, 1)
    blocked_ratio = round((dependency_summary.get("blocked_task_count", 0) / max(total, 1)) * 100, 1)

    return {
        "completion_rate": completion_rate,
        "blocked_ratio": blocked_ratio,
        "dependency_density": dependency_summary.get("dependency_density", 0),
        "workflow_efficiency": round(100.0 - blocked_ratio, 1),
    }


def analyze_risk_distribution(project_risks: List[Dict[str, object]]) -> Dict[str, object]:
    distribution = defaultdict(int)
    for item in project_risks:
        distribution[item.get("severity", "low")] += 1

    return {
        "risk_distribution": dict(distribution),
        "high_risk_projects": [item for item in project_risks if item.get("severity") in {"high", "critical"}],
    }


def build_workflow_health(
    projects: List[Project],
    tasks: List[Task],
    dependency_summary: Dict[str, object],
    project_risks: List[Dict[str, object]],
) -> Dict[str, object]:
    return {
        "project_health": analyze_project_health(projects, tasks),
        "workflow_efficiency": analyze_workflow_efficiency(tasks, dependency_summary),
        "risk_distribution": analyze_risk_distribution(project_risks),
    }
