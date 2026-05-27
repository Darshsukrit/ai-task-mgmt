from fastapi import APIRouter, Depends, HTTPException
from typing import List, Dict
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.task import Task
from app.models.project import Project
from app.models.workspace import Workspace
from app.models.activity import Activity
from app.models.productivity_log import ProductivityLog
from app.models.task_dependency import TaskDependency
from app.models.insight import Insight
from app.intelligence.risk_engine import analyze_project_risk
from app.intelligence.dependency_engine import analyze_dependencies
from app.intelligence.productivity_engine import summarize_productivity
from app.intelligence.insight_engine import generate_contextual_insights
from app.intelligence.analytics_engine import build_workflow_health

router = APIRouter(tags=["intelligence"])


def _load_workspace_id(db: Session) -> int:
    workspace = db.query(Workspace).order_by(Workspace.id).first()
    return workspace.id if workspace else None


def _load_tasks(db: Session) -> List[Task]:
    return db.query(Task).all()


def _load_projects(db: Session) -> List[Project]:
    return db.query(Project).all()


def _load_dependencies(db: Session) -> List[TaskDependency]:
    return db.query(TaskDependency).all()


def _load_productivity_logs(db: Session) -> List[ProductivityLog]:
    return db.query(ProductivityLog).all()


def _load_activities(db: Session) -> List[Activity]:
    return db.query(Activity).all()


def _load_insights(db: Session) -> List[Dict[str, object]]:
    rows = db.query(Insight).order_by(Insight.generated_at.desc()).all()
    return [
        {
            "id": row.id,
            "workspace_id": row.workspace_id,
            "type": row.type,
            "message": row.message,
            "severity": row.severity,
            "generated_at": row.generated_at.isoformat() if row.generated_at else None,
        }
        for row in rows
    ]


def _build_project_risks(projects: List[Project], tasks: List[Task], dependencies: List[TaskDependency]) -> List[Dict[str, object]]:
    projects_by_id = {project.id: project for project in projects}
    tasks_by_project = {}
    for task in tasks:
        tasks_by_project.setdefault(task.project_id, []).append(task)

    risks = []
    for project_id, project_tasks in tasks_by_project.items():
        project_risk = analyze_project_risk(project_tasks, [dep for dep in dependencies if dep.task_id in {task.id for task in project_tasks}])
        project_risk["title"] = projects_by_id.get(project_id).title if project_id in projects_by_id else "Unknown"
        risks.append(project_risk)

    return risks


@router.get("/risk-analysis")
def get_risk_analysis(db: Session = Depends(get_db)):
    tasks = _load_tasks(db)
    projects = _load_projects(db)
    dependencies = _load_dependencies(db)
    project_risks = _build_project_risks(projects, tasks, dependencies)

    return {
        "project_risks": project_risks,
        "summary": {
            "project_count": len(projects),
            "task_count": len(tasks),
            "high_risk_projects": sum(1 for item in project_risks if item["severity"] in {"high", "critical"}),
        },
    }


@router.get("/dependency-analysis")
def get_dependency_analysis(db: Session = Depends(get_db)):
    tasks = _load_tasks(db)
    dependencies = _load_dependencies(db)
    analysis = analyze_dependencies(tasks, dependencies)
    return analysis


@router.get("/productivity-summary")
def get_productivity_summary(db: Session = Depends(get_db)):
    productivity_logs = _load_productivity_logs(db)
    activities = _load_activities(db)
    summary = summarize_productivity(productivity_logs, activities)
    return summary


@router.get("/workflow-health")
def get_workflow_health(db: Session = Depends(get_db)):
    tasks = _load_tasks(db)
    projects = _load_projects(db)
    dependencies = _load_dependencies(db)
    project_risks = _build_project_risks(projects, tasks, dependencies)
    dependency_summary = analyze_dependencies(tasks, dependencies)
    workflow_health = build_workflow_health(projects, tasks, dependency_summary, project_risks)
    return workflow_health


@router.get("/insights")
def get_insights(db: Session = Depends(get_db)):
    tasks = _load_tasks(db)
    projects = _load_projects(db)
    dependencies = _load_dependencies(db)
    productivity_logs = _load_productivity_logs(db)
    activities = _load_activities(db)
    workspace_id = _load_workspace_id(db)

    project_risks = _build_project_risks(projects, tasks, dependencies)
    dependency_summary = analyze_dependencies(tasks, dependencies)
    productivity_summary = summarize_productivity(productivity_logs, activities)
    generated = generate_contextual_insights(db, workspace_id, project_risks, dependency_summary, productivity_summary)

    return {
        "generated_insights": generated,
        "stored_insights": _load_insights(db),
    }
