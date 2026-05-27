from pathlib import Path
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    ALGORITHM: str = "HS256"

    class Config:
        env_file = str(Path(__file__).resolve().parents[2] / ".env")


def _normalize_env_value(val: str | None) -> str | None:
    if not val:
        return val
    v = val.strip()
    # if accidentally the whole 'KEY=VALUE' line was read as the value, strip the prefix
    if "=" in v and v.split("=", 1)[0].isupper():
        parts = v.split("=", 1)
        # If left side looks like a key name (e.g., DATABASE_URL), return right side
        if parts[0].isalpha() or parts[0].replace('_', '').isalpha():
            return parts[1].strip().strip('"').strip("'")
    return v


settings = Settings()
# normalize potential malformed values
settings.DATABASE_URL = _normalize_env_value(settings.DATABASE_URL)
settings.SECRET_KEY = _normalize_env_value(settings.SECRET_KEY)
