from functools import lru_cache
from pydantic import BaseSettings, Field


class Settings(BaseSettings):
  api_prefix: str = "/api"
  access_token_expire_minutes: int = 30
  refresh_token_expire_minutes: int = 60 * 24 * 14
  secret_key: str = Field(default="changeme", env="WELLNEST_SECRET_KEY")
  refresh_secret_key: str = Field(default="changeme-refresh", env="WELLNEST_REFRESH_SECRET_KEY")
  algorithm: str = "HS256"
  database_url: str = Field(
      default="postgresql+psycopg2://wellnest:wellnest@localhost:5432/wellnest",
      env="WELLNEST_DATABASE_URL"
  )
  redis_url: str = Field(default="redis://localhost:6379/0", env="WELLNEST_REDIS_URL")
  environment: str = Field(default="development", env="ENVIRONMENT")
  frontend_origin: str = Field(default="http://localhost:5173", env="WELLNEST_FRONTEND_ORIGIN")

  class Config:
    env_file = ".env"
    env_file_encoding = "utf-8"


@lru_cache()
def get_settings() -> Settings:
  return Settings()
