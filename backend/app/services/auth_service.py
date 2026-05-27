from sqlalchemy.orm import Session
from app.models.user import User
from app.utils.hashing import hash_password, verify_password
from app.core.security import create_access_token


def create_user(db: Session, name: str, email: str, password: str):
    # debug: inspect password type/length to catch unexpected values
    try:
        pwd_preview = repr(password)
        pwd_len = len(password)
    except Exception:
        pwd_preview = '<unrepresentable>'
        pwd_len = -1
    print(f"[auth_service.create_user] password_repr={pwd_preview} length={pwd_len}")
    user = User(name=name, email=email, password=hash_password(password))
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def authenticate_user(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return None
    if not verify_password(password, user.password):
        return None
    token = create_access_token({"user_id": user.id})
    return {"access_token": token, "user": user}
