import os
import sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), 'app')))

from sqlalchemy.orm import Session
from app.database.session import SessionLocal, engine, Base
from app.models.workspace import Workspace
from app.models.project import Project
from app.models.task import Task
from app.models.task_dependency import TaskDependency
from app.models.activity import Activity
from app.models.productivity_log import ProductivityLog
from app.models.insight import Insight
from app.models.user import User
from datetime import datetime, timedelta

def seed_db():
    print("Creating tables...")
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()

    # Create User
    u1 = User(email="sarah@example.com", password="password", name="Sarah")
    db.add(u1)
    db.commit()

    # Create Workspaces
    w1 = Workspace(name="Product Launch", owner_id=u1.id)
    w2 = Workspace(name="Fundraise", owner_id=u1.id)
    w3 = Workspace(name="Life OS", owner_id=u1.id)
    db.add_all([w1, w2, w3])
    db.commit()

    # Create Projects
    p1 = Project(workspace_id=w1.id, title="Product Launch HQ", description="Unified context for GTM", progress=72, status="active")
    p2 = Project(workspace_id=w2.id, title="Series A Narrative", description="Investor story", progress=58, status="active")
    p3 = Project(workspace_id=w3.id, title="Personal Operating System", description="Life admin", progress=41, status="steady")
    db.add_all([p1, p2, p3])
    db.commit()

    # Create Tasks
    t1 = Task(project_id=p1.id, title="Draft GTM Strategy", status="completed", priority="high")
    t2 = Task(project_id=p1.id, title="Design Marketing Assets", status="in_progress", priority="high")
    t3 = Task(project_id=p1.id, title="Launch Website", status="pending", priority="critical")
    t4 = Task(project_id=p2.id, title="Pitch Deck Draft", status="completed", priority="high")
    t5 = Task(project_id=p2.id, title="Financial Projections", status="in_progress", priority="high")
    db.add_all([t1, t2, t3, t4, t5])
    db.commit()

    # Create Dependencies
    d1 = TaskDependency(task_id=t3.id, depends_on_task_id=t2.id)
    db.add(d1)
    db.commit()

    # Create Activity
    a1 = Activity(user_id=u1.id, action="Switched from Engineering to Marketing", timestamp=datetime.utcnow())
    db.add(a1)
    db.commit()

    print("Database seeded successfully!")

if __name__ == "__main__":
    seed_db()
