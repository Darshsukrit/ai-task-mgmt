from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from datetime import datetime
from typing import List
from app.database.session import get_db
from app.models.note import Note
from app.models.user import User

router = APIRouter(prefix="/notes", tags=["notes"])


# Schemas for request/response
class NoteCreate(dict):
    pass


class NoteUpdate(dict):
    pass


@router.get('/', response_model=List[dict])
def list_notes(
    workspace_id: int = Query(...),
    db: Session = Depends(get_db)
):
    """List all notes for a workspace"""
    notes = db.query(Note).filter(Note.workspace_id == workspace_id).all()
    return [
        {
            "id": n.id,
            "title": n.title,
            "content": n.content,
            "tags": n.tags.split(',') if n.tags else [],
            "pinned": n.pinned,
            "created_at": n.created_at.isoformat(),
            "updated_at": n.updated_at.isoformat(),
            "user_id": n.user_id,
        }
        for n in notes
    ]


@router.get('/{note_id}', response_model=dict)
def get_note(note_id: int, db: Session = Depends(get_db)):
    """Get a single note by ID"""
    note = db.query(Note).filter(Note.id == note_id).first()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    
    return {
        "id": note.id,
        "title": note.title,
        "content": note.content,
        "tags": note.tags.split(',') if note.tags else [],
        "pinned": note.pinned,
        "created_at": note.created_at.isoformat(),
        "updated_at": note.updated_at.isoformat(),
        "user_id": note.user_id,
        "workspace_id": note.workspace_id,
    }


@router.post('/', response_model=dict)
def create_note(payload: dict, db: Session = Depends(get_db)):
    """Create a new note"""
    # Validate required fields
    if not payload.get('title') or not payload.get('content') or not payload.get('workspace_id') or not payload.get('user_id'):
        raise HTTPException(status_code=400, detail="Missing required fields: title, content, workspace_id, user_id")
    
    # Convert tags list to comma-separated string if provided
    tags = payload.get('tags', [])
    tags_str = ','.join(tags) if isinstance(tags, list) else tags
    
    note = Note(
        workspace_id=payload['workspace_id'],
        user_id=payload['user_id'],
        title=payload['title'],
        content=payload['content'],
        tags=tags_str,
        pinned=payload.get('pinned', False),
    )
    
    db.add(note)
    db.commit()
    db.refresh(note)
    
    return {
        "id": note.id,
        "title": note.title,
        "content": note.content,
        "tags": note.tags.split(',') if note.tags else [],
        "pinned": note.pinned,
        "created_at": note.created_at.isoformat(),
        "updated_at": note.updated_at.isoformat(),
        "user_id": note.user_id,
        "workspace_id": note.workspace_id,
    }


@router.put('/{note_id}', response_model=dict)
def update_note(note_id: int, payload: dict, db: Session = Depends(get_db)):
    """Update an existing note"""
    note = db.query(Note).filter(Note.id == note_id).first()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    
    # Update fields
    if 'title' in payload:
        note.title = payload['title']
    if 'content' in payload:
        note.content = payload['content']
    if 'tags' in payload:
        tags = payload['tags']
        note.tags = ','.join(tags) if isinstance(tags, list) else tags
    if 'pinned' in payload:
        note.pinned = payload['pinned']
    
    note.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(note)
    
    return {
        "id": note.id,
        "title": note.title,
        "content": note.content,
        "tags": note.tags.split(',') if note.tags else [],
        "pinned": note.pinned,
        "created_at": note.created_at.isoformat(),
        "updated_at": note.updated_at.isoformat(),
        "user_id": note.user_id,
        "workspace_id": note.workspace_id,
    }


@router.delete('/{note_id}')
def delete_note(note_id: int, db: Session = Depends(get_db)):
    """Delete a note"""
    note = db.query(Note).filter(Note.id == note_id).first()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    
    db.delete(note)
    db.commit()
    
    return {"message": "Note deleted successfully"}
