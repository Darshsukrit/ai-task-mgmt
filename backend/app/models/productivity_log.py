from sqlalchemy import Column, Integer, ForeignKey, Float, Date
from app.database.session import Base


class ProductivityLog(Base):
    __tablename__ = 'productivity_logs'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    focus_hours = Column(Float, default=0.0)
    distraction_count = Column(Integer, default=0)
    productivity_score = Column(Float, default=0.0)
    date = Column(Date)
