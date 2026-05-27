from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from datetime import datetime
from typing import List
from app.database.session import get_db
from app.models.event import Event

router = APIRouter(prefix="/events", tags=["events"])


@router.get('/', response_model=List[dict])
def list_events(
    workspace_id: int = Query(...),
    db: Session = Depends(get_db)
):
    """List all events for a workspace"""
    events = db.query(Event).filter(Event.workspace_id == workspace_id).all()
    return [
        {
            "id": e.id,
            "title": e.title,
            "description": e.description,
            "start_time": e.start_time.isoformat(),
            "end_time": e.end_time.isoformat(),
            "location": e.location,
            "color": e.color,
            "is_all_day": e.is_all_day,
            "reminder_enabled": e.reminder_enabled,
            "reminder_minutes": e.reminder_minutes,
            "created_at": e.created_at.isoformat(),
            "updated_at": e.updated_at.isoformat(),
            "user_id": e.user_id,
        }
        for e in events
    ]


@router.get('/{event_id}', response_model=dict)
def get_event(event_id: int, db: Session = Depends(get_db)):
    """Get a single event by ID"""
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    return {
        "id": event.id,
        "title": event.title,
        "description": event.description,
        "start_time": event.start_time.isoformat(),
        "end_time": event.end_time.isoformat(),
        "location": event.location,
        "color": event.color,
        "is_all_day": event.is_all_day,
        "reminder_enabled": event.reminder_enabled,
        "reminder_minutes": event.reminder_minutes,
        "created_at": event.created_at.isoformat(),
        "updated_at": event.updated_at.isoformat(),
        "user_id": event.user_id,
        "workspace_id": event.workspace_id,
    }


@router.post('/', response_model=dict)
def create_event(payload: dict, db: Session = Depends(get_db)):
    """Create a new event"""
    # Validate required fields
    required_fields = ['title', 'start_time', 'end_time', 'workspace_id', 'user_id']
    if not all(payload.get(field) for field in required_fields):
        raise HTTPException(status_code=400, detail=f"Missing required fields: {', '.join(required_fields)}")
    
    # Parse datetime fields
    try:
        start_time = datetime.fromisoformat(payload['start_time'].replace('Z', '+00:00'))
        end_time = datetime.fromisoformat(payload['end_time'].replace('Z', '+00:00'))
    except:
        raise HTTPException(status_code=400, detail="Invalid date format for start_time or end_time")
    
    event = Event(
        workspace_id=payload['workspace_id'],
        user_id=payload['user_id'],
        title=payload['title'],
        description=payload.get('description', ''),
        start_time=start_time,
        end_time=end_time,
        location=payload.get('location', ''),
        color=payload.get('color', '#3b82f6'),
        is_all_day=payload.get('is_all_day', False),
        reminder_enabled=payload.get('reminder_enabled', True),
        reminder_minutes=payload.get('reminder_minutes', 15),
    )
    
    db.add(event)
    db.commit()
    db.refresh(event)
    
    return {
        "id": event.id,
        "title": event.title,
        "description": event.description,
        "start_time": event.start_time.isoformat(),
        "end_time": event.end_time.isoformat(),
        "location": event.location,
        "color": event.color,
        "is_all_day": event.is_all_day,
        "reminder_enabled": event.reminder_enabled,
        "reminder_minutes": event.reminder_minutes,
        "created_at": event.created_at.isoformat(),
        "updated_at": event.updated_at.isoformat(),
        "user_id": event.user_id,
        "workspace_id": event.workspace_id,
    }


@router.put('/{event_id}', response_model=dict)
def update_event(event_id: int, payload: dict, db: Session = Depends(get_db)):
    """Update an existing event"""
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    # Update fields
    if 'title' in payload:
        event.title = payload['title']
    if 'description' in payload:
        event.description = payload['description']
    if 'start_time' in payload:
        try:
            event.start_time = datetime.fromisoformat(payload['start_time'].replace('Z', '+00:00'))
        except:
            raise HTTPException(status_code=400, detail="Invalid start_time format")
    if 'end_time' in payload:
        try:
            event.end_time = datetime.fromisoformat(payload['end_time'].replace('Z', '+00:00'))
        except:
            raise HTTPException(status_code=400, detail="Invalid end_time format")
    if 'location' in payload:
        event.location = payload['location']
    if 'color' in payload:
        event.color = payload['color']
    if 'is_all_day' in payload:
        event.is_all_day = payload['is_all_day']
    if 'reminder_enabled' in payload:
        event.reminder_enabled = payload['reminder_enabled']
    if 'reminder_minutes' in payload:
        event.reminder_minutes = payload['reminder_minutes']
    
    event.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(event)
    
    return {
        "id": event.id,
        "title": event.title,
        "description": event.description,
        "start_time": event.start_time.isoformat(),
        "end_time": event.end_time.isoformat(),
        "location": event.location,
        "color": event.color,
        "is_all_day": event.is_all_day,
        "reminder_enabled": event.reminder_enabled,
        "reminder_minutes": event.reminder_minutes,
        "created_at": event.created_at.isoformat(),
        "updated_at": event.updated_at.isoformat(),
        "user_id": event.user_id,
        "workspace_id": event.workspace_id,
    }


@router.delete('/{event_id}')
def delete_event(event_id: int, db: Session = Depends(get_db)):
    """Delete an event"""
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    db.delete(event)
    db.commit()
    
    return {"message": "Event deleted successfully"}
