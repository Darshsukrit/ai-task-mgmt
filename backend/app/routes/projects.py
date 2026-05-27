from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database.session import get_db
from app.models.project import Project

router = APIRouter(prefix="/projects", tags=["projects"])


@router.get('/', response_model=List[dict])
def list_projects(db: Session = Depends(get_db)):
    import json
    items = db.query(Project).all()
    result = []
    for p in items:
        try:
            members = json.loads(p.members)
        except:
            members = []
        result.append({
            "id": p.id,
            "name": p.title,
            "title": p.title,
            "description": p.description,
            "status": p.status,
            "progress": p.progress,
            "color": p.color,
            "members": members,
            "contextNodes": p.context_nodes,
        })
    return result


@router.post('/', response_model=dict)
def create_project(payload: dict, db: Session = Depends(get_db)):
    p = Project(**payload)
    db.add(p)
    db.commit()
    db.refresh(p)
    return {"id": p.id, "title": p.title}
