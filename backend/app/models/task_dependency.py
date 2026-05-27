from sqlalchemy import Column, Integer, ForeignKey
from app.database.session import Base


class TaskDependency(Base):
    __tablename__ = 'task_dependencies'

    id = Column(Integer, primary_key=True, index=True)
    task_id = Column(Integer, ForeignKey('tasks.id'))
    depends_on_task_id = Column(Integer, ForeignKey('tasks.id'))
