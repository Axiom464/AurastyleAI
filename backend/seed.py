"""Seed script for AuraStyle AI: populates initial curated bookmarked looks into MongoDB."""

import asyncio
from lib.db import db, ensure_indexes
from lib.matrix_engine import MATRIX_CATALOG


async def seed_data():
    print("Ensuring database indexes...")
    await ensure_indexes()
    
    existing_count = await db.saved_looks.count_documents({})
    print(f"Current saved looks in database: {existing_count}")
    
    if existing_count == 0:
        print("Seeding initial starter bookmarked looks...")
        # Select 4 high-fashion signature looks across cultures & genders
        seed_samples = [
            MATRIX_CATALOG[0],   # Indian Male Emerald Maharaja
            MATRIX_CATALOG[1],   # Indian Female Regal Rani
            MATRIX_CATALOG[2],   # Western Male Cyber-Luxe
            MATRIX_CATALOG[3],   # Western Female Neo-Matrix
        ]
        
        for sample in seed_samples:
            doc = sample.model_dump()
            doc["notes"] = "Curated AI Matrix Spotlight Look"
            await db.saved_looks.insert_one(doc)
            
        print("Successfully seeded 4 starter wardrobe looks!")
    else:
        print("Database already contains saved looks. Skipping seed.")


if __name__ == "__main__":
    asyncio.run(seed_data())
