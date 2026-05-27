from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta
from typing import List
from app.database.session import get_db
from app.models.task import Task
from app.models.activity import Activity
from app.models.productivity_log import ProductivityLog
from app.models.insight import Insight
from app.models.project import Project

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get('/aggregated-data')
def get_aggregated_dashboard_data(
    workspace_id: int = Query(...),
    db: Session = Depends(get_db)
):
    """
    Dynamically fetch and aggregate all dashboard data from the database.
    Returns complex chart data, analytics, and insights.
    """
    
    # Get all tasks for this workspace
    tasks = db.query(Task).filter(Task.project_id.in_(
        db.query(Project.id).filter(Project.workspace_id == workspace_id)
    )).all()
    
    # Get recent activities
    activities = db.query(Activity).filter(
        Activity.workspace_id == workspace_id
    ).order_by(Activity.created_at.desc()).limit(20).all()
    
    # Get productivity logs
    productivity_logs = db.query(ProductivityLog).filter(
        ProductivityLog.workspace_id == workspace_id
    ).all()
    
    # Get insights
    insights = db.query(Insight).filter(
        Insight.workspace_id == workspace_id
    ).all()
    
    # Calculate stats
    total_tasks = len(tasks)
    completed_tasks = len([t for t in tasks if t.status == 'completed'])
    open_tasks = len([t for t in tasks if t.status == 'open'])
    in_progress_tasks = len([t for t in tasks if t.status == 'in_progress'])
    
    # Calculate completion rate
    completion_rate = (completed_tasks / total_tasks * 100) if total_tasks > 0 else 0
    
    # Build activity feed
    activity_feed = [
        {
            "id": a.id,
            "user": a.user.name if a.user else "Unknown",
            "action": a.action_type,
            "entity": a.entity_type,
            "timestamp": a.created_at.isoformat(),
        }
        for a in activities
    ]
    
    # Build productivity analytics
    productivity_data = {}
    for log in productivity_logs:
        date_key = log.date.isoformat() if log.date else "unknown"
        if date_key not in productivity_data:
            productivity_data[date_key] = {
                "focused_hours": 0,
                "interruptions": 0,
                "tasks_completed": 0,
            }
        productivity_data[date_key]["focused_hours"] = log.focused_hours
        productivity_data[date_key]["interruptions"] = log.interruptions
        productivity_data[date_key]["tasks_completed"] = log.tasks_completed
    
    # Build analytics series (last 30 days)
    today = datetime.utcnow().date()
    analytics_series = []
    for i in range(29, -1, -1):
        date = today - timedelta(days=i)
        date_str = date.isoformat()
        analytics_series.append({
            "date": date_str,
            "tasks": productivity_data.get(date_str, {}).get("tasks_completed", 0),
            "completed": productivity_data.get(date_str, {}).get("tasks_completed", 0),
            "focused_hours": productivity_data.get(date_str, {}).get("focused_hours", 0),
        })
    
    # Build insights
    insights_data = [
        {
            "id": i.id,
            "title": i.title,
            "description": i.description,
            "type": i.insight_type,
            "confidence": i.confidence,
            "created_at": i.created_at.isoformat(),
        }
        for i in insights
    ]
    
    # Build focus analytics (peak hours simulation)
    focus_analytics = {
        "peak_hours": ["09:00", "10:00", "14:00", "15:00"],
        "peak_focus_hours": sum(log.focused_hours for log in productivity_logs) / max(len(productivity_logs), 1),
        "distraction_frequency": sum(log.interruptions for log in productivity_logs) / max(len(productivity_logs), 1),
    }
    
    # Build workflow health
    workflow_health = {
        "task_completion_rate": round(completion_rate, 2),
        "on_time_delivery": round(completion_rate, 2),  # Simplified
        "team_velocity": total_tasks / max(len(productivity_logs), 1),
    }
    
    return {
        "stats": {
            "total_tasks": total_tasks,
            "completed_tasks": completed_tasks,
            "open_tasks": open_tasks,
            "in_progress_tasks": in_progress_tasks,
            "completion_rate": round(completion_rate, 2),
        },
        "activity_feed": activity_feed,
        "analytics_series": analytics_series,
        "focus_analytics": focus_analytics,
        "workflow_health": workflow_health,
        "insights": insights_data,
    }


@router.get('/stats')
def get_dashboard_stats(
    workspace_id: int = Query(...),
    db: Session = Depends(get_db)
):
    """Get quick dashboard statistics"""
    tasks = db.query(Task).filter(Task.project_id.in_(
        db.query(Project.id).filter(Project.workspace_id == workspace_id)
    )).all()
    
    total_tasks = len(tasks)
    completed_tasks = len([t for t in tasks if t.status == 'completed'])
    open_tasks = len([t for t in tasks if t.status == 'open'])
    
    return {
        "total": total_tasks,
        "completed": completed_tasks,
        "open": open_tasks,
        "completion_rate": (completed_tasks / total_tasks * 100) if total_tasks > 0 else 0,
    }
