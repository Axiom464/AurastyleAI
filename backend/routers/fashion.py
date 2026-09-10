from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional, Dict, Any
from models.fashion import (
    FashionLook,
    MatrixQueryParams,
    SavedLook,
    SavedLookCreate,
    FacialMetrics,
    TelemetryEvent
)
from lib.matrix_engine import (
    MATRIX_CATALOG,
    calculate_facial_geometry
)
from lib.db import db
from datetime import datetime, timezone

fashion_router = APIRouter(prefix="/fashion", tags=["fashion"])


@fashion_router.get("/stats")
async def get_matrix_stats():
    """Returns overview statistics about the 144+ look procedural matrix."""
    total = len(MATRIX_CATALOG)
    indian_looks = len([l for l in MATRIX_CATALOG if l.culture == "indian"])
    western_looks = len([l for l in MATRIX_CATALOG if l.culture == "western"])
    male_looks = len([l for l in MATRIX_CATALOG if l.gender == "male"])
    female_looks = len([l for l in MATRIX_CATALOG if l.gender == "female"])
    
    return {
        "total_combinations": total,
        "base_profiles": 36,
        "procedural_scale_factor": 4,
        "indian_looks": indian_looks,
        "western_looks": western_looks,
        "male_looks": male_looks,
        "female_looks": female_looks,
        "supported_face_shapes": ["Oval", "Square", "Heart", "Diamond"],
        "supported_skin_tones": ["Fair", "Olive", "Deep"],
        "supported_body_types": ["Athletic", "Muscular", "Soft"],
        "engine_version": "v3.8-procedural-emerald"
    }


@fashion_router.post("/query")
async def query_matrix(params: MatrixQueryParams):
    """
    Query the procedural matrix engine based on multidimensional biometric parameters.
    Returns matched primary looks and facial geometry recommendations.
    """
    filtered = MATRIX_CATALOG
    
    if params.gender and params.gender != "all":
        filtered = [l for l in filtered if l.gender.lower() == params.gender.lower()]
        
    if params.culture and params.culture != "all":
        filtered = [l for l in filtered if l.culture.lower() == params.culture.lower()]
        
    if params.skin and params.skin != "all":
        # Prioritize exact skin match
        filtered_skin = [l for l in filtered if l.skin_type.lower() == params.skin.lower()]
        if filtered_skin:
            filtered = filtered_skin
            
    if params.body and params.body != "all":
        filtered_body = [l for l in filtered if l.body_type.lower() == params.body.lower()]
        if filtered_body:
            filtered = filtered_body
            
    if params.hair and params.hair != "all":
        filtered_hair = [l for l in filtered if l.hair_type.lower() == params.hair.lower()]
        if filtered_hair:
            filtered = filtered_hair
            
    if params.face_shape and params.face_shape != "all":
        filtered_face = [l for l in filtered if l.face_shape.lower() == params.face_shape.lower()]
        if filtered_face:
            filtered = filtered_face
            
    if params.search:
        q = params.search.lower()
        filtered = [
            l for l in filtered
            if q in l.title.lower()
            or q in l.description.lower()
            or q in l.look_code.lower()
            or any(q in t for t in l.tags)
            or any(q in p.name.lower() for p in l.pieces)
        ]
        
    total_matches = len(filtered)
    paginated = filtered[params.offset : params.offset + params.limit]
    
    # Calculate live facial geometry specs
    facial_geometry = calculate_facial_geometry(
        face_shape=params.face_shape if params.face_shape != "all" else "oval",
        skin_tone=params.skin if params.skin != "all" else "olive"
    )
    
    return {
        "total_matches": total_matches,
        "count": len(paginated),
        "looks": paginated,
        "facial_geometry": facial_geometry,
        "params": params
    }


@fashion_router.get("/looks", response_model=List[FashionLook])
async def list_looks(
    gender: Optional[str] = "all",
    culture: Optional[str] = "all",
    skin: Optional[str] = "all",
    body: Optional[str] = "all",
    hair: Optional[str] = "all",
    face_shape: Optional[str] = "all",
    search: Optional[str] = None,
    limit: int = 24,
    offset: int = 0
):
    """Retrieve catalog looks with flexible querying."""
    filtered = MATRIX_CATALOG
    
    if gender and gender != "all":
        filtered = [l for l in filtered if l.gender.lower() == gender.lower()]
    if culture and culture != "all":
        filtered = [l for l in filtered if l.culture.lower() == culture.lower()]
    if skin and skin != "all":
        filtered = [l for l in filtered if l.skin_type.lower() == skin.lower()]
    if body and body != "all":
        filtered = [l for l in filtered if l.body_type.lower() == body.lower()]
    if hair and hair != "all":
        filtered = [l for l in filtered if l.hair_type.lower() == hair.lower()]
    if face_shape and face_shape != "all":
        filtered = [l for l in filtered if l.face_shape.lower() == face_shape.lower()]
        
    if search:
        q = search.lower()
        filtered = [
            l for l in filtered
            if q in l.title.lower() or q in l.description.lower() or q in l.look_code.lower()
        ]
        
    return filtered[offset : offset + limit]


@fashion_router.get("/look/{look_id}", response_model=FashionLook)
async def get_look(look_id: str):
    """Get single look by unique id or look_code."""
    for look in MATRIX_CATALOG:
        if look.id == look_id or look.look_code.lower() == look_id.lower():
            return look
    raise HTTPException(status_code=404, detail=f"Look '{look_id}' not found in Matrix catalog")


@fashion_router.get("/facial-analysis", response_model=FacialMetrics)
async def get_facial_analysis(
    face_shape: str = Query("oval", description="Oval, Square, Heart, Diamond"),
    skin_tone: str = Query("olive", description="Fair, Olive, Deep")
):
    """Get facial geometry and personalized accessory recommendations."""
    return calculate_facial_geometry(face_shape, skin_tone)


@fashion_router.get("/saved-looks", response_model=List[SavedLook])
async def get_saved_looks():
    """Retrieve all bookmarked wardrobe looks from MongoDB."""
    docs = await db.saved_looks.find().sort("created_at", -1).to_list(200)
    results: List[SavedLook] = []
    for doc in docs:
        # Normalize naive datetime from motor
        if "created_at" in doc and doc["created_at"].tzinfo is None:
            doc["created_at"] = doc["created_at"].replace(tzinfo=timezone.utc)
        results.append(SavedLook(**doc))
    return results


@fashion_router.post("/saved-looks", response_model=SavedLook)
async def save_look(payload: SavedLookCreate):
    """Save a generated look configuration to the user's wardrobe."""
    # Check if already saved by look_code
    existing = await db.saved_looks.find_one({"look_code": payload.look_code})
    if existing:
        if "created_at" in existing and existing["created_at"].tzinfo is None:
            existing["created_at"] = existing["created_at"].replace(tzinfo=timezone.utc)
        return SavedLook(**existing)
        
    saved_obj = SavedLook(**payload.model_dump())
    await db.saved_looks.insert_one(saved_obj.model_dump())
    return saved_obj


@fashion_router.delete("/saved-looks/{look_id}")
async def delete_saved_look(look_id: str):
    """Remove a look from saved wardrobe."""
    res = await db.saved_looks.delete_one({"$or": [{"id": look_id}, {"look_code": look_id}]})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Saved look not found")
    return {"status": "deleted", "id": look_id}


@fashion_router.post("/telemetry")
async def log_telemetry(event: TelemetryEvent):
    """Record an asynchronous telemetry tracing event."""
    await db.scan_history.insert_one(event.model_dump())
    return {"status": "logged", "event_id": event.id}
