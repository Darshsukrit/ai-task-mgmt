from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.schemas.auth import UserCreate, Token
from app.schemas.user import UserRead
from app.services.auth_service import create_user, authenticate_user
from app.models.user import User

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post('/signup', response_model=UserRead)
def signup(payload: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == payload.email).first()
    if existing:
        raise HTTPException(status_code=400, detail='Email already registered')
    user = create_user(db, payload.name, payload.email, payload.password)
    return user


@router.post('/login', response_model=Token)
def login(payload: UserCreate, db: Session = Depends(get_db)):
    auth = authenticate_user(db, payload.email, payload.password)
    if not auth:
        raise HTTPException(status_code=401, detail='Invalid credentials')
    return {"access_token": auth['access_token'], "token_type": 'bearer'}
