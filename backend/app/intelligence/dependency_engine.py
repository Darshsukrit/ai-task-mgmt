from collections import defaultdict, deque
from typing import Dict, List
from app.models.task import Task
from app.models.task_dependency import TaskDependency


def build_dependency_maps(dependencies: List[TaskDependency]) -> Dict[str, Dict[int, List[int]]]:
    depends_on = defaultdict(list)
    dependents = defaultdict(list)
    for dep in dependencies:
        depends_on[dep.task_id].append(dep.depends_on_task_id)
        dependents[dep.depends_on_task_id].append(dep.task_id)
    return {"depends_on": depends_on, "dependents": dependents}


def _task_is_complete(task: Task) -> bool:
    return bool(task.status and task.status.lower() in {"completed", "done", "closed"})


def _collect_downstream(task_id: int, dependents: Dict[int, List[int]]) -> List[int]:
    visited = set()
    queue = deque([task_id])
    while queue:
        current = queue.popleft()
        for child in dependents.get(current, []):
            if child not in visited:
                visited.add(child)
                queue.append(child)
    visited.discard(task_id)
    return list(visited)


def analyze_dependencies(tasks: List[Task], dependencies: List[TaskDependency]) -> Dict[str, object]:
    if not tasks:
        return {
            "dependency_density": 0,
            "blocked_task_count": 0,
            "bottleneck_count": 0,
            "affected_task_count": 0,
            "bottlenecks": [],
            "blocked_chains": [],
            "graph": [],
        }

    task_map = {task.id: task for task in tasks}
    dependency_maps = build_dependency_maps(dependencies)
    depends_on = dependency_maps["depends_on"]
    dependents = dependency_maps["dependents"]

    blocked_tasks = []
    blocked_chains = []
    bottlenecks = []
    affected_task_ids = set()

    for task in tasks:
        if not _task_is_complete(task):
            unresolved = [dep_id for dep_id in depends_on.get(task.id, []) if dep_id in task_map and not _task_is_complete(task_map[dep_id])]
            if unresolved:
                blocked_tasks.append(task)
                downstream = _collect_downstream(task.id, dependents)
                affected_task_ids.update(downstream)
                blocked_chains.append({
                    "task_id": task.id,
                    "title": task.title,
                    "unresolved_dependency_count": len(unresolved),
                    "downstream_impact_count": len(downstream),
                    "message": "Task is blocked by unresolved prerequisites.",
                })

    for task in tasks:
        in_count = len(depends_on.get(task.id, []))
        out_count = len(dependents.get(task.id, []))
        if in_count >= 3 or out_count >= 3:
            bottlenecks.append({
                "task_id": task.id,
                "title": task.title,
                "incoming_dependencies": in_count,
                "outgoing_dependents": out_count,
                "message": "Task is a dependency bottleneck." if out_count >= 3 else "Task has multiple prerequisites.",
            })

    graph = [
        {
            "task_id": task.id,
            "title": task.title,
            "depends_on": depends_on.get(task.id, []),
            "dependent_count": len(dependents.get(task.id, [])),
        }
        for task in tasks
    ]

    return {
        "dependency_density": round(len(dependencies) / max(len(tasks), 1), 2),
        "blocked_task_count": len(blocked_tasks),
        "bottleneck_count": len(bottlenecks),
        "affected_task_count": len(affected_task_ids),
        "bottlenecks": bottlenecks,
        "blocked_chains": blocked_chains,
        "graph": graph,
    }
