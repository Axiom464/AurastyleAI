from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone


class ItemPiece(BaseModel):
    category: str  # top, bottom, footwear, eyewear, wristwear
    name: str
    brand_or_label: str
    material: str
    color_name: str
    color_hex: str
    image_url: str
    style_note: str
    price_tag: str


class ColorHarmony(BaseModel):
    scheme_name: str  # e.g., "Monochromatic Emerald", "Analogous Jewel", "Triadic Royal", "High-Contrast Stealth"
    dominant_hex: str
    secondary_hex: str
    accent_hex: str
    contrast_ratio: str
    theory_description: str


class FacialMetrics(BaseModel):
    face_shape: str  # Oval, Square, Heart, Diamond, Round, Oblong
    skin_tone: str  # Cool Fair, Warm Olive, Deep Rich, Golden Amber
    undertone: str  # Cool, Warm, Neutral
    jawline_angle: str  # Defined 115°, Sculpted Sharp, Soft Rounded
    symmetry_score: float  # e.g. 96.4
    eyewear_recommendation: str
    grooming_advice: str
    metal_harmony: str  # Emerald & Brushed Gold, Platinum & Cyber Steel, Rose Gold & Copper


class FashionLook(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    look_code: str  # e.g. "AS-704"
    title: str
    gender: str  # male, female
    culture: str  # indian, western, fusion
    occasion: str  # Gala, Cyber Street, Festive Wedding, Executive Soiree, Summer Resort
    skin_type: str  # fair, olive, deep
    body_type: str  # athletic, muscular, soft
    hair_type: str  # short, textured, long, curly
    face_shape: str  # oval, square, heart, diamond
    hero_image: str
    description: str
    color_harmony: ColorHarmony
    pieces: List[ItemPiece]
    accessories_summary: str
    grooming_note: str
    biometric_match_rate: float
    tags: List[str] = Field(default_factory=list)


class MatrixQueryParams(BaseModel):
    gender: str = "all"  # all, male, female
    culture: str = "all"  # all, indian, western, fusion
    skin: str = "olive"  # fair, olive, deep
    body: str = "athletic"  # athletic, muscular, soft
    hair: str = "textured"  # short, textured, long, curly
    face_shape: str = "oval"  # oval, square, heart, diamond
    occasion: Optional[str] = None
    search: Optional[str] = None
    limit: int = 24
    offset: int = 0


class SavedLookCreate(BaseModel):
    look_code: str
    title: str
    gender: str
    culture: str
    occasion: str
    hero_image: str
    description: str
    color_harmony: ColorHarmony
    pieces: List[ItemPiece]
    accessories_summary: str
    grooming_note: str
    biometric_match_rate: float
    notes: Optional[str] = ""
    tags: List[str] = Field(default_factory=list)


class SavedLook(SavedLookCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class TelemetryEvent(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    event_type: str  # camera_scan, matrix_query, wardrobe_save, profile_change
    details: Dict[str, Any] = Field(default_factory=dict)
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
