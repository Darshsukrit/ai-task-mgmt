from .auth import router as auth_router
from .projects import router as projects_router
from .tasks import router as tasks_router
from .workspaces import router as workspaces_router
from .analytics import router as analytics_router
from .intelligence import router as intelligence_router

__all__ = [
    "auth_router",
    "projects_router",
    "tasks_router",
    "workspaces_router",
    "analytics_router",
    "intelligence_router",
]
