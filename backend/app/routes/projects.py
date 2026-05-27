from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database.session import get_db
from app.models.project import Project

router = APIRouter(prefix="/projects", tags=["projects"])


@router.get('/', response_model=List[dict])
def list_projects(db: Session = Depends(get_db)):
    items = db.query(Project).all()
    return [
        {"id": p.id, "title": p.title, "status": p.status, "progress": p.progress}
        for p in items
    ]


@router.post('/', response_model=dict)
def create_project(payload: dict, db: Session = Depends(get_db)):
    p = Project(**payload)
    db.add(p)
    db.commit()
    db.refresh(p)
    return {"id": p.id, "title": p.title}
