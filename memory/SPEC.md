# AuraStyle AI — System Specification

## Overview
AuraStyle AI is a high-capacity procedural fashion matrix and neural styling platform featuring active HTML5 laptop camera ingestion, real-time facial geometry landmark analysis, 144+ multi-dimensional look permutations, distinct Men's and Women's catalogues spanning traditional Indian couture, Indo-Western fusion, and contemporary Western streetwear/luxury, coupled with an asynchronous telemetry tracing console.

## Architecture
- **Backend**: FastAPI with async Motor (MongoDB) on port 8001.
  - Endpoints on `/api/fashion/...`:
    - `POST /api/fashion/query`: Procedural matrix query with biometric and demographic filtering.
    - `GET /api/fashion/looks`: Catalog look listing with filters.
    - `GET /api/fashion/look/{look_id}`: Single look specification.
    - `GET /api/fashion/facial-analysis`: Facial geometry and accessory match advisory.
    - `GET /api/fashion/stats`: Aggregate matrix statistics (144+ combinations, 36 base profiles).
    - `GET /api/fashion/saved-looks`: Retrieve bookmarked wardrobe looks.
    - `POST /api/fashion/saved-looks`: Save look to user wardrobe.
    - `DELETE /api/fashion/saved-looks/{id}`: Remove look from wardrobe.
    - `POST /api/fashion/telemetry`: Asynchronous telemetry trace event logging.
- **Frontend**: Vite + React 19 + TypeScript + Tailwind v4 + shadcn/ui.
  - **Live Camera Ingestion Viewfinder**: Active HTML5 `<video>` feed with `navigator.mediaDevices.getUserMedia`, 2.5s emerald neon laser scan-bar overlay loop, frame freeze simulation, and real-time facial landmark HUD.
  - **Facial Geometry Studio**: Real-time evaluation of Face Shape (Oval, Square, Heart, Diamond), Skin Undertone, Jawline Angularity, Symmetry score %, and tailored recommendations for eyewear, metal harmony, and grooming.
  - **Procedural 144-Outfit Matrix Engine**: 36 base biometric profiles scaled across 4 secondary style injects with separate Men's & Women's catalogues, Indian Ethnic (Kurta, Sherwani, Lehenga, Saree) & Western Luxury/Streetwear collections, 5-piece breakdowns (Top, Bottom, Footwear drop, Eyewear optics, Wristwear & jewels), and color theory harmonies.
  - **Asynchronous Telemetry Stream Terminal**: Docked black terminal logging real-time typing effect traces on every scan or modifier trigger.
  - **Wardrobe Bookmarking & Lookbook Exporter**: Interactive saved wardrobe modal with JSON export and inspect modes.

## Data Model
- `FashionLook`: Unique identifier, look code (e.g. AS-704), title, gender, culture, occasion, skin/body/hair/face parameters, hero image, color harmony, 5 item pieces, grooming note, and biometric match score.
- `ItemPiece`: Category, name, designer label, material, color swatch & hex, image, style note, price tag.
- `ColorHarmony`: Scheme name, dominant/secondary/accent hex, contrast ratio, theory description.
- `FacialMetrics`: Face shape, skin tone, undertone, jawline angle, symmetry score, eyewear recommendation, grooming advice, metal harmony.
- `SavedLook`: Look metadata stored in MongoDB `saved_looks` collection.
- `TelemetryEvent`: Logged event stored in MongoDB `scan_history` collection.
