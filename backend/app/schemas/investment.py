from pydantic import BaseModel


class InvestmentCreate(BaseModel):
    campaign_name: str
    amount: float


class InvestmentPublic(BaseModel):
    id: int
    campaign_name: str
    amount: float
    status: str

    class Config:
        from_attributes = True