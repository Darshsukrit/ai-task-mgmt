from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import session as db_session
from app.routes import auth as auth_router
from app.routes import projects as projects_router
from app.routes import tasks as tasks_router
from app.routes import workspaces as workspaces_router
from app.routes import analytics as analytics_router
from app.routes import intelligence as intelligence_router

def create_app() -> FastAPI:
    app = FastAPI(title='ContextOS API')

    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            "http://127.0.0.1:5173",
            "http://localhost:5173",
        ],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(auth_router.router)
    app.include_router(projects_router.router)
    app.include_router(tasks_router.router)
    app.include_router(workspaces_router.router)
    app.include_router(analytics_router.router)
    app.include_router(intelligence_router.router)

    return app


app = create_app()


@app.on_event('startup')
def on_startup():
    # create DB tables if not present; import all models so they are registered
    from app.database.session import engine, Base
    import app.models.user
    import app.models.workspace
    import app.models.project
    import app.models.task
    import app.models.task_dependency
    import app.models.productivity_log
    import app.models.activity
    import app.models.insight

    Base.metadata.create_all(bind=engine)
