from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Float, Text
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database.session import Base


class Project(Base):
    __tablename__ = 'projects'

    id = Column(Integer, primary_key=True, index=True)
    workspace_id = Column(Integer, ForeignKey('workspaces.id'))
    title = Column(String(255), nullable=False)
    description = Column(Text)
    status = Column(String(64), default='active')
    color = Column(String(64), default='indigo')
    members = Column(String(255), default='[]') # stored as JSON string
    context_nodes = Column(Integer, default=0)
    deadline = Column(DateTime, nullable=True)
    risk_score = Column(Float, default=0.0)
    progress = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    workspace = relationship('Workspace')
