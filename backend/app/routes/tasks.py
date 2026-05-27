from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database.session import get_db
from app.models.task import Task

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.get('/', response_model=List[dict])
def list_tasks(db: Session = Depends(get_db)):
    items = db.query(Task).all()
    return [{"id": t.id, "title": t.title, "status": t.status} for t in items]


@router.post('/', response_model=dict)
def create_task(payload: dict, db: Session = Depends(get_db)):
    t = Task(**payload)
    db.add(t)
    db.commit()
    db.refresh(t)
    return {"id": t.id, "title": t.title}
