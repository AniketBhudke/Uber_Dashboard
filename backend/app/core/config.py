from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "UBER COMMAND CENTER"
    app_env: str = "development"
    secret_key: str = "demo-secret-key-change-me"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 60
    database_url: str = "postgresql://postgres:postgres@localhost:5432/uber_command_center"
    cors_origins: str = "http://localhost:5173,http://127.0.0.1:5173"

    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()
