from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database.session import get_db
from app.models.workspace import Workspace

router = APIRouter(prefix="/workspaces", tags=["workspaces"])


@router.get('/', response_model=List[dict])
def list_workspaces(db: Session = Depends(get_db)):
    items = db.query(Workspace).all()
    return [{"id": w.id, "name": w.name, "type": w.type} for w in items]


@router.post('/', response_model=dict)
def create_workspace(payload: dict, db: Session = Depends(get_db)):
    w = Workspace(**payload)
    db.add(w)
    db.commit()
    db.refresh(w)
    return {"id": w.id, "name": w.name}
