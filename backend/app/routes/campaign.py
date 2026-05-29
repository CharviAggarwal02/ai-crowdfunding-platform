from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime

from ..db import get_db
from ..models.campaign import Campaign

router = APIRouter(
    prefix="/api/campaigns",
    tags=["Campaigns"]
)

# ================================
# ⭐ GET ALL CAMPAIGNS
# ================================
@router.get("/")
def get_campaigns(db: Session = Depends(get_db)):

    campaigns = db.query(Campaign).order_by(Campaign.id.desc()).all()

    return [
        {
            "id": c.id,
            "name": c.name,
            "category": c.category,
            "goal": c.goal,
            "pledged": c.pledged,
            "state": c.state,
            "launched": c.launched
        }
        for c in campaigns
    ]


# ================================
# ⭐ GET SINGLE CAMPAIGN
# ================================
@router.get("/{campaign_id}")
def get_campaign(campaign_id: int, db: Session = Depends(get_db)):

    campaign = db.query(Campaign).filter(Campaign.id == campaign_id).first()

    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")

    return campaign


# ================================
# ⭐ CREATE CAMPAIGN
# ================================
@router.post("/")
def create_campaign(data: dict, db: Session = Depends(get_db)):

    if "name" not in data or "goal" not in data:
        raise HTTPException(status_code=400, detail="Name and Goal required")

    new_campaign = Campaign(
        name=data["name"],
        category=data.get("category", "Technology"),
        goal=float(data["goal"]),
        pledged=0,
        state="live",
        launched=datetime.now().strftime("%Y-%m-%d")
    )

    db.add(new_campaign)
    db.commit()
    db.refresh(new_campaign)

    return {
        "message": "Campaign created successfully",
        "campaign_id": new_campaign.id
    }


# ================================
# ⭐ UPDATE CAMPAIGN
# ================================
@router.put("/{campaign_id}")
def update_campaign(campaign_id: int, data: dict, db: Session = Depends(get_db)):

    campaign = db.query(Campaign).filter(Campaign.id == campaign_id).first()

    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")

    campaign.name = data.get("name", campaign.name)
    campaign.category = data.get("category", campaign.category)
    campaign.goal = float(data.get("goal", campaign.goal))
    campaign.state = data.get("state", campaign.state)

    db.commit()

    return {"message": "Campaign updated successfully"}


# ================================
# ⭐ DELETE CAMPAIGN
# ================================
@router.delete("/{campaign_id}")
def delete_campaign(campaign_id: int, db: Session = Depends(get_db)):

    campaign = db.query(Campaign).filter(Campaign.id == campaign_id).first()

    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")

    db.delete(campaign)
    db.commit()

    return {"message": "Campaign deleted successfully"}


# ================================
# ⭐ INVEST / PLEDGE API (VERY IMPORTANT)
# ================================
@router.post("/{campaign_id}/pledge")
def pledge_campaign(campaign_id: int, data: dict, db: Session = Depends(get_db)):

    amount = data.get("amount")

    if not amount:
        raise HTTPException(status_code=400, detail="Amount required")

    campaign = db.query(Campaign).filter(Campaign.id == campaign_id).first()

    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")

    campaign.pledged += float(amount)

    # ⭐ If goal reached → mark successful
    if campaign.pledged >= campaign.goal:
        campaign.state = "successful"

    db.commit()

    return {
        "message": "Investment successful",
        "total_pledged": campaign.pledged
    }