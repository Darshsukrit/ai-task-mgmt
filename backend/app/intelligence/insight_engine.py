from typing import Dict, List, Optional
from sqlalchemy.orm import Session
from app.models.insight import Insight


def _unique_insight(db: Session, workspace_id: int, insight_type: str, message: str) -> bool:
    return db.query(Insight).filter(
        Insight.workspace_id == workspace_id,
        Insight.type == insight_type,
        Insight.message == message,
    ).first() is None


def generate_contextual_insights(
    db: Session,
    workspace_id: Optional[int],
    project_risks: List[Dict[str, object]],
    dependency_summary: Dict[str, object],
    productivity_summary: Dict[str, object],
) -> List[Dict[str, object]]:
    insights = []

    if any(item["severity"] in {"high", "critical"} for item in project_risks):
        message = "Deadline conflict detected: one or more projects have elevated risk."
        insights.append({
            "type": "deadline_conflict",
            "message": message,
            "severity": "high",
        })

    if dependency_summary.get("blocked_task_count", 0) > 0:
        insights.append({
            "type": "workflow_bottleneck",
            "message": "Workflow bottleneck identified through blocked dependency chains.",
            "severity": "high" if dependency_summary["affected_task_count"] >= 3 else "moderate",
        })

    if productivity_summary.get("trend") == "declining":
        insights.append({
            "type": "high_workload_risk",
            "message": "High workload risk this week with declining productivity trends.",
            "severity": "high",
        })
    elif productivity_summary.get("trend") == "stable":
        insights.append({
            "type": "steady_productivity",
            "message": "Productivity appears stable but should be monitored for bottlenecks.",
            "severity": "info",
        })
    else:
        insights.append({
            "type": "positive_productivity",
            "message": "Productivity is improving with strong focus patterns.",
            "severity": "info",
        })

    if dependency_summary.get("dependency_density", 0) > 1.5:
        insights.append({
            "type": "dependency_resolution_required",
            "message": "Dependency resolution required: workflows are tightly coupled.",
            "severity": "moderate",
        })

    if workspace_id is not None:
        for insight in insights:
            if _unique_insight(db, workspace_id, insight["type"], insight["message"]):
                row = Insight(
                    workspace_id=workspace_id,
                    type=insight["type"],
                    message=insight["message"],
                    severity=insight["severity"],
                )
                db.add(row)
        db.commit()

    return insights
