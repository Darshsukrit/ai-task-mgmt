from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db

router = APIRouter(prefix="/analytics", tags=["analytics"])


@router.get('/productivity')
def productivity_overview(db: Session = Depends(get_db)):
    # placeholder: aggregate productivity logs
    return {"message": "productivity overview placeholder"}
