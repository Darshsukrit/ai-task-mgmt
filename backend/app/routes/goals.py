from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from datetime import datetime
from typing import List
from app.database.session import get_db
from app.models.goal import Goal

router = APIRouter(prefix="/goals", tags=["goals"])


@router.get('/', response_model=List[dict])
def list_goals(
    workspace_id: int = Query(...),
    db: Session = Depends(get_db)
):
    """List all goals for a workspace"""
    goals = db.query(Goal).filter(Goal.workspace_id == workspace_id).all()
    return [
        {
            "id": g.id,
            "title": g.title,
            "description": g.description,
            "target_date": g.target_date.isoformat() if g.target_date else None,
            "status": g.status,
            "progress": g.progress,
            "category": g.category,
            "created_at": g.created_at.isoformat(),
            "updated_at": g.updated_at.isoformat(),
            "user_id": g.user_id,
        }
        for g in goals
    ]


@router.get('/{goal_id}', response_model=dict)
def get_goal(goal_id: int, db: Session = Depends(get_db)):
    """Get a single goal by ID"""
    goal = db.query(Goal).filter(Goal.id == goal_id).first()
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    
    return {
        "id": goal.id,
        "title": goal.title,
        "description": goal.description,
        "target_date": goal.target_date.isoformat() if goal.target_date else None,
        "status": goal.status,
        "progress": goal.progress,
        "category": goal.category,
        "created_at": goal.created_at.isoformat(),
        "updated_at": goal.updated_at.isoformat(),
        "user_id": goal.user_id,
        "workspace_id": goal.workspace_id,
    }


@router.post('', response_model=dict)
@router.post('/', response_model=dict)
def create_goal(payload: dict, db: Session = Depends(get_db)):
    """Create a new goal"""
    # Validate required fields
    if not payload.get('title') or not payload.get('workspace_id') or not payload.get('user_id'):
        raise HTTPException(status_code=400, detail="Missing required fields: title, workspace_id, user_id")
    
    # Parse target_date if provided
    target_date = None
    if payload.get('target_date'):
        try:
            target_date = datetime.fromisoformat(payload['target_date'].replace('Z', '+00:00'))
        except:
            raise HTTPException(status_code=400, detail="Invalid target_date format")
    
    goal = Goal(
        workspace_id=payload['workspace_id'],
        user_id=payload['user_id'],
        title=payload['title'],
        description=payload.get('description', ''),
        target_date=target_date,
        status=payload.get('status', 'active'),
        progress=payload.get('progress', 0.0),
        category=payload.get('category', 'general'),
    )
    
    db.add(goal)
    db.commit()
    db.refresh(goal)
    
    return {
        "id": goal.id,
        "title": goal.title,
        "description": goal.description,
        "target_date": goal.target_date.isoformat() if goal.target_date else None,
        "status": goal.status,
        "progress": goal.progress,
        "category": goal.category,
        "created_at": goal.created_at.isoformat(),
        "updated_at": goal.updated_at.isoformat(),
        "user_id": goal.user_id,
        "workspace_id": goal.workspace_id,
    }


@router.put('/{goal_id}', response_model=dict)
def update_goal(goal_id: int, payload: dict, db: Session = Depends(get_db)):
    """Update an existing goal"""
    goal = db.query(Goal).filter(Goal.id == goal_id).first()
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    
    # Update fields
    if 'title' in payload:
        goal.title = payload['title']
    if 'description' in payload:
        goal.description = payload['description']
    if 'target_date' in payload:
        if payload['target_date']:
            try:
                goal.target_date = datetime.fromisoformat(payload['target_date'].replace('Z', '+00:00'))
            except:
                raise HTTPException(status_code=400, detail="Invalid target_date format")
        else:
            goal.target_date = None
    if 'status' in payload:
        goal.status = payload['status']
    if 'progress' in payload:
        goal.progress = payload['progress']
    if 'category' in payload:
        goal.category = payload['category']
    
    goal.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(goal)
    
    return {
        "id": goal.id,
        "title": goal.title,
        "description": goal.description,
        "target_date": goal.target_date.isoformat() if goal.target_date else None,
        "status": goal.status,
        "progress": goal.progress,
        "category": goal.category,
        "created_at": goal.created_at.isoformat(),
        "updated_at": goal.updated_at.isoformat(),
        "user_id": goal.user_id,
        "workspace_id": goal.workspace_id,
    }


@router.delete('/{goal_id}')
def delete_goal(goal_id: int, db: Session = Depends(get_db)):
    """Delete a goal"""
    goal = db.query(Goal).filter(Goal.id == goal_id).first()
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    
    db.delete(goal)
    db.commit()
    
    return {"message": "Goal deleted successfully"}
