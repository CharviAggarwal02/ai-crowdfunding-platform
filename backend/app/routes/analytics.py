from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from ..db import get_db
from ..models.campaign import Campaign
import pandas as pd
from functools import lru_cache

router = APIRouter(prefix="/api/analytics", tags=["Analytics"])

DATA_PATH = "app/ml/dataset/kickstarter.csv"


# ⭐ Load CSV only ONCE (VERY IMPORTANT OPTIMIZATION)
@lru_cache()
def load_dataset():
    df = pd.read_csv(DATA_PATH)
    return df


# ---------------- SUMMARY ----------------
@router.get("/summary")
def get_summary():

    df = pd.read_csv(DATA_PATH)

    # ⭐ CLEAN NUMERIC COLUMNS
    df["goal"] = pd.to_numeric(df["goal"], errors="coerce")
    df["pledged"] = pd.to_numeric(df["pledged"], errors="coerce")

    # ⭐ REMOVE INVALID ROWS
    df = df.dropna(subset=["goal", "pledged"])

    total_goal = float(df["goal"].sum())
    total_pledged = float(df["pledged"].sum())
    total_projects = int(len(df))

    success_rate = float(
        (df["state"] == "successful").sum() / total_projects * 100
    )

    avg_pledge = float(df["pledged"].mean())

    return {
        "totalFunding": round(total_pledged, 2),
        "totalProjects": total_projects,
        "successRate": round(success_rate, 2),
        "avgPledge": round(avg_pledge, 2)
    }


# ---------------- CATEGORY DISTRIBUTION ----------------
@router.get("/categories")
def category_distribution():

    df = load_dataset()

    data = (
        df.groupby("category")["pledged"]
        .sum()
        .sort_values(ascending=False)
        .head(5)
        .reset_index()
    )

    return data.to_dict(orient="records")


# ---------------- FUNDING TREND (REAL DB DATA) ----------------
@router.get("/funding-trend")
def funding_trend(db: Session = Depends(get_db)):

    campaigns = db.query(Campaign).all()

    if not campaigns:
        return []

    data = [
        {
            "launched": c.launched,
            "pledged": c.pledged or 0
        }
        for c in campaigns
    ]

    df = pd.DataFrame(data)

    df["launched"] = pd.to_datetime(
        df["launched"], errors="coerce"
    )

    df = df.dropna(subset=["launched"])

    if df.empty:
        return []

    df["month"] = df["launched"].dt.to_period("M").astype(str)

    trend = (
        df.groupby("month")["pledged"]
        .sum()
        .reset_index()
        .sort_values("month")
    )

    return trend.to_dict(orient="records")


# ---------------- SECTOR ANALYTICS ----------------
@router.get("/sectors")
def sector_analytics():

    df = load_dataset()

    data = (
        df.groupby("category")
        .agg(
            totalRaised=("pledged", "sum"),
            successRate=("state", lambda x: (x == "successful").mean() * 100)
        )
        .sort_values("totalRaised", ascending=False)
        .head(4)
        .reset_index()
    )

    data["successRate"] = data["successRate"].round(2)

    return data.to_dict(orient="records")


# ---------------- TOP PROJECTS ----------------
@router.get("/top-projects")
def top_projects():

    df = load_dataset()

    top = df.sort_values("pledged", ascending=False).head(5)

    top["fundingPercent"] = (
        (top["pledged"] / top["goal"]) * 100
    ).round(2)

    return [
        {
            "project": row["name"],
            "category": row["category"],
            "raised": row["pledged"],
            "backers": row["backers"],
            "fundingPercent": row["fundingPercent"]
        }
        for _, row in top.iterrows()
    ]


# ---------------- RECENT CAMPAIGNS ----------------
@router.get("/recent")
def get_recent_campaigns():

    df = pd.read_csv(DATA_PATH)

    df["pledged"] = pd.to_numeric(df["pledged"], errors="coerce")
    df = df.dropna(subset=["pledged"])

    df = df.sort_values("deadline", ascending=False).head(5)

    campaigns = []

    for _, row in df.iterrows():
        campaigns.append({
            "date": str(row["launched"]),
            "category": str(row["category"]),
            "company": str(row["name"]),
            "amount": f"${int(row['pledged'])}",
            "status": "Completed" if row["state"] == "successful" else "Pending"
        })

    return campaigns


# ⭐ NEW — ENTREPRENEUR DASHBOARD ANALYTICS (REAL DB)
@router.get("/entrepreneur")
def entrepreneur_dashboard(db: Session = Depends(get_db)):

    total_funds = db.query(func.sum(Campaign.pledged)).scalar() or 0
    total_campaigns = db.query(Campaign).count()

    avg_goal = db.query(func.avg(Campaign.goal)).scalar() or 0

    categories = (
        db.query(Campaign.category, func.sum(Campaign.pledged))
        .group_by(Campaign.category)
        .all()
    )

    return {
        "totalFunds": total_funds,
        "totalCampaigns": total_campaigns,
        "avgGoal": avg_goal,
        "categories": [
            {"category": c[0], "pledged": c[1] or 0}
            for c in categories
        ]
    }