export interface ItemPiece {
  category: string;
  name: string;
  brand_or_label: string;
  material: string;
  color_name: string;
  color_hex: string;
  image_url: string;
  style_note: string;
  price_tag: string;
}

export interface ColorHarmony {
  scheme_name: string;
  dominant_hex: string;
  secondary_hex: string;
  accent_hex: string;
  contrast_ratio: string;
  theory_description: string;
}

export interface FacialMetrics {
  face_shape: string;
  skin_tone: string;
  undertone: string;
  jawline_angle: string;
  symmetry_score: number;
  eyewear_recommendation: string;
  grooming_advice: string;
  metal_harmony: string;
}

export interface FashionLook {
  id: string;
  look_code: string;
  title: string;
  gender: 'male' | 'female';
  culture: 'indian' | 'western' | 'fusion';
  occasion: string;
  skin_type: string;
  body_type: string;
  hair_type: string;
  face_shape: string;
  hero_image: string;
  description: string;
  color_harmony: ColorHarmony;
  pieces: ItemPiece[];
  accessories_summary: string;
  grooming_note: string;
  biometric_match_rate: number;
  tags: string[];
}

export interface MatrixQueryParams {
  gender?: string;
  culture?: string;
  skin?: string;
  body?: string;
  hair?: string;
  face_shape?: string;
  occasion?: string;
  search?: string;
  limit?: number;
  offset?: number;
}

export interface MatrixQueryResponse {
  total_matches: number;
  count: number;
  looks: FashionLook[];
  facial_geometry: FacialMetrics;
  params: MatrixQueryParams;
}

export interface SavedLookCreate {
  look_code: string;
  title: string;
  gender: string;
  culture: string;
  occasion: string;
  hero_image: string;
  description: string;
  color_harmony: ColorHarmony;
  pieces: ItemPiece[];
  accessories_summary: string;
  grooming_note: string;
  biometric_match_rate: number;
  notes?: string;
  tags: string[];
}

export interface SavedLook extends SavedLookCreate {
  id: string;
  created_at: string;
}

export interface MatrixStats {
  total_combinations: number;
  base_profiles: number;
  procedural_scale_factor: number;
  indian_looks: number;
  western_looks: number;
  male_looks: number;
  female_looks: number;
  supported_face_shapes: string[];
  supported_skin_tones: string[];
  supported_body_types: string[];
  engine_version: string;
}
