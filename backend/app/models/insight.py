from sqlalchemy import Column, Integer, ForeignKey, String, DateTime, Text
from sqlalchemy.sql import func
from app.database.session import Base


class Insight(Base):
    __tablename__ = 'insights'

    id = Column(Integer, primary_key=True, index=True)
    workspace_id = Column(Integer, ForeignKey('workspaces.id'))
    type = Column(String(64))
    message = Column(Text)
    severity = Column(String(32), default='info')
    generated_at = Column(DateTime(timezone=True), server_default=func.now())
