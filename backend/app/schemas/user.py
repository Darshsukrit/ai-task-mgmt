from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional


class UserBase(BaseModel):
    name: str
    email: EmailStr


class UserCreate(UserBase):
    password: str


class UserRead(UserBase):
    id: int
    role: Optional[str]
    timezone: Optional[str]
    created_at: Optional[datetime]

    class Config:
        orm_mode = True
