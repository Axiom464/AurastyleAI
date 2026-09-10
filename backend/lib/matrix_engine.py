import hashlib
from typing import List, Dict, Any
from models.fashion import FashionLook, ItemPiece, ColorHarmony, FacialMetrics

# Curated high-resolution image bank
IMAGES_BANK = {
    "indian_male": [
        "https://images.unsplash.com/photo-1781106785439-306653a7066d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzN8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBldGhuaWMlMjBrdXJ0YSUyMHNoZXJ3YW5pJTIwbWVufGVufDB8fHx8MTc4OTAxMjUxM3ww&ixlib=rb-4.1.0&q=85",
        "https://images.unsplash.com/photo-1781106784087-d6f4432ad721?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzN8MHwxfHNlYXJjaHwzfHxpbmRpYW4lMjBldGhuaWMlMjBrdXJ0YSUyMHNoZXJ3YW5pJTIwbWVufGVufDB8fHx8MTc4OTAxMjUxM3ww&ixlib=rb-4.1.0&q=85",
        "https://images.unsplash.com/photo-1785612516109-ec479a684113?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzN8MHwxfHNlYXJjaHw0fHxpbmRpYW4lMjBldGhuaWMlMjBrdXJ0YSUyMHNoZXJ3YW5pJTIwbWVufGVufDB8fHx8MTc4OTAxMjUxM3ww&ixlib=rb-4.1.0&q=85",
        "https://images.unsplash.com/photo-1781106784325-52bc05c289aa?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzN8MHwxfHNlYXJjaHwyfHxpbmRpYW4lMjBldGhuaWMlMjBrdXJ0YSUyMHNoZXJ3YW5pJTIwbWVufGVufDB8fHx8MTc4OTAxMjUxM3ww&ixlib=rb-4.1.0&q=85",
        "https://images.unsplash.com/photo-1522169092203-1cce6d311a0b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtZW5zd2VhciUyMGx1eHVyeSUyMGt1cnRhJTIwc2hlcndhbml8ZW58MHx8fHwxNzg5MDEyNDgwfDA&ixlib=rb-4.1.0&q=85",
        "https://images.unsplash.com/photo-1783188223126-69e5d0b56f39?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHw0fHxpbmRpYW4lMjBtZW5zd2VhciUyMGx1eHVyeSUyMGt1cnRhJTIwc2hlcndhbml8ZW58MHx8fHwxNzg5MDEyNDgwfDA&ixlib=rb-4.1.0&q=85"
    ],
    "indian_female": [
        "https://images.unsplash.com/photo-1677691257005-9d69ab23f485?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MDV8MHwxfHNlYXJjaHw0fHxpbmRpYW4lMjBsdXh1cnklMjBzYXJlZSUyMGxlaGVuZ2ElMjB3b21lbnxlbnwwfHx8fDE3ODkwMTI1MTN8MA&ixlib=rb-4.1.0&q=85",
        "https://images.unsplash.com/flagged/photo-1580141043903-ef7df571364b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MDV8MHwxfHNlYXJjaHwyfHxpbmRpYW4lMjBsdXh1cnklMjBzYXJlZSUyMGxlaGVuZ2ElMjB3b21lbnxlbnwwfHx8fDE3ODkwMTI1MTN8MA&ixlib=rb-4.1.0&q=85",
        "https://images.unsplash.com/photo-1654764746225-e63f5e90facd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MDV8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBsdXh1cnklMjBzYXJlZSUyMGxlaGVuZ2ElMjB3b21lbnxlbnwwfHx8fDE3ODkwMTI1MTN8MA&ixlib=rb-4.1.0&q=85",
        "https://images.unsplash.com/photo-1740431377901-c2f28d50c759?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MDV8MHwxfHNlYXJjaHwzfHxpbmRpYW4lMjBsdXh1cnklMjBzYXJlZSUyMGxlaGVuZ2ElMjB3b21lbnxlbnwwfHx8fDE3ODkwMTI1MTN8MA&ixlib=rb-4.1.0&q=85",
        "https://images.unsplash.com/photo-1668371459824-094a960a227d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwzfHxpbmRpYW4lMjB3b21lbnN3ZWFyJTIwc2FyZWUlMjBsZWhlbmdhfGVufDB8fHx8MTc4OTAxMjQ4MHww&ixlib=rb-4.1.0&q=85"
    ],
    "western_male": [
        "https://images.unsplash.com/photo-1697319292673-f18acff2e959?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDZ8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBtb2Rlcm4lMjB3ZXN0ZXJuJTIwb3V0Zml0JTIwbWVufGVufDB8fHx8MTc4OTAxMjUxM3ww&ixlib=rb-4.1.0&q=85",
        "https://images.unsplash.com/photo-1677188531651-93bac644e2a4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDZ8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBtb2Rlcm4lMjB3ZXN0ZXJuJTIwb3V0Zml0JTIwbWVufGVufDB8fHx8MTc4OTAxMjUxM3ww&ixlib=rb-4.1.0&q=85",
        "https://images.unsplash.com/photo-1602622573203-f27d27a3a945?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDZ8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjB3ZXN0ZXJuJTIwb3V0Zml0JTIwbWVufGVufDB8fHx8MTc4OTAxMjUxM3ww&ixlib=rb-4.1.0&q=85",
        "https://images.unsplash.com/photo-1532332248682-206cc786359f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzOTB8MHwxfHNlYXJjaHwxfHxtZW5zd2VhciUyMGx1eHVyeSUyMHN0cmVldHdlYXIlMjBvdXRmaXR8ZW58MHx8fHwxNzg5MDEyNDgwfDA&ixlib=rb-4.1.0&q=85",
        "https://images.unsplash.com/photo-1620834767673-19f69709a716?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzOTB8MHwxfHNlYXJjaHw0fHxtZW5zd2VhciUyMGx1eHVyeSUyMHN0cmVldHdlYXIlMjBvdXRmaXR8ZW58MHx8fHwxNzg5MDEyNDgwfDA&ixlib=rb-4.1.0&q=85",
        "https://images.unsplash.com/photo-1559697242-a465f2578a95?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzOTB8MHwxfHNlYXJjaHwyfHxtZW5zd2VhciUyMGx1eHVyeSUyMHN0cmVldHdlYXIlMjBvdXRmaXR8ZW58MHx8fHwxNzg5MDEyNDgwfDA&ixlib=rb-4.1.0&q=85"
    ],
    "western_female": [
        "https://images.unsplash.com/photo-1602580170250-cdfc887a56ff?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBzdHJlZXR3ZWFyJTIwYmxhemVyJTIwd29tZW4lMjBmYXNoaW9ufGVufDB8fHx8MTc4OTAxMjUxM3ww&ixlib=rb-4.1.0&q=85",
        "https://images.unsplash.com/photo-1719293259782-0725d0d206bb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBzdHJlZXR3ZWFyJTIwYmxhemVyJTIwd29tZW4lMjBmYXNoaW9ufGVufDB8fHx8MTc4OTAxMjUxM3ww&ixlib=rb-4.1.0&q=85",
        "https://images.unsplash.com/photo-1617647858823-2424b6dc472f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzdHJlZXR3ZWFyJTIwYmxhemVyJTIwd29tZW4lMjBmYXNoaW9ufGVufDB8fHx8MTc4OTAxMjUxM3ww&ixlib=rb-4.1.0&q=85",
        "https://images.unsplash.com/photo-1719293259790-69523ed58a86?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBzdHJlZXR3ZWFyJTIwYmxhemVyJTIwd29tZW4lMjBmYXNoaW9ufGVufDB8fHx8MTc4OTAxMjUxM3ww&ixlib=rb-4.1.0&q=85"
    ],
    "shoes": [
        "https://images.unsplash.com/photo-1618677831708-0e7fda3148b4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBzbmVha2VycyUyMHNob2VzJTIwZmFzaGlvbnxlbnwwfHx8fDE3ODkwMTI1MTh8MA&ixlib=rb-4.1.0&q=85",
        "https://images.unsplash.com/photo-1575176647993-a8a6f538e940?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzbmVha2VycyUyMHNob2VzJTIwZmFzaGlvbnxlbnwwfHx8fDE3ODkwMTI1MTh8MA&ixlib=rb-4.1.0&q=85",
        "https://images.unsplash.com/photo-1575176648002-f2021e56b375?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBzbmVha2VycyUyMHNob2VzJTIwZmFzaGlvbnxlbnwwfHx8fDE3ODkwMTI1MTh8MA&ixlib=rb-4.1.0&q=85",
        "https://images.unsplash.com/photo-1543652711-77eeb35ae548?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBzbmVha2VycyUyMHNob2VzJTIwZmFzaGlvbnxlbnwwfHx8fDE3ODkwMTI1MTh8MA&ixlib=rb-4.1.0&q=85"
    ],
    "eyewear": [
        "https://images.unsplash.com/photo-1599705709640-9f9eb5964485?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwzfHxkZXNpZ25lciUyMHN1bmdsYXNzZXMlMjBleWV3ZWFyJTIwbW9kZWx8ZW58MHx8fHwxNzg5MDEyNTE4fDA&ixlib=rb-4.1.0&q=85",
        "https://images.unsplash.com/photo-1556015048-4d3aa10df74c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHw0fHxkZXNpZ25lciUyMHN1bmdsYXNzZXMlMjBleWV3ZWFyJTIwbW9kZWx8ZW58MHx8fHwxNzg5MDEyNTE4fDA&ixlib=rb-4.1.0&q=85",
        "https://images.unsplash.com/photo-1611824204322-24963b44d68b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwyfHxkZXNpZ25lciUyMHN1bmdsYXNzZXMlMjBleWV3ZWFyJTIwbW9kZWx8ZW58MHx8fHwxNzg5MDEyNTE4fDA&ixlib=rb-4.1.0&q=85",
        "https://images.unsplash.com/photo-1605813808456-26c16c0dfb77?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMHN1bmdsYXNzZXMlMjBleWV3ZWFyJTIwbW9kZWx8ZW58MHx8fHwxNzg5MDEyNTE4fDA&ixlib=rb-4.1.0&q=85"
    ],
    "wristwear": [
        "https://images.unsplash.com/photo-1782012133180-91aca4bcf9ad?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaCUyMHdyaXN0d2VhciUyMGNocm9ub21ldGVyfGVufDB8fHx8MTc4OTAxMjUxOHww&ixlib=rb-4.1.0&q=85",
        "https://images.unsplash.com/photo-1651160670627-2896ddf7822f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTF8MHwxfHNlYXJjaHwzfHxldGhuaWMlMjBqZXdlbHJ5JTIwZWFycmluZ3MlMjBuZWNrbGFjZSUyMGdvbGR8ZW58MHx8fHwxNzg5MDEyNTE4fDA&ixlib=rb-4.1.0&q=85",
        "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTF8MHwxfHNlYXJjaHwyfHxldGhuaWMlMjBqZXdlbHJ5JTIwZWFycmluZ3MlMjBuZWNrbGFjZSUyMGdvbGR8ZW58MHx8fHwxNzg5MDEyNTE4fDA&ixlib=rb-4.1.0&q=85",
        "https://images.unsplash.com/photo-1694062045776-f48d9b6de57e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTF8MHwxfHNlYXJjaHw0fHxldGhuaWMlMjBqZXdlbHJ5JTIwZWFycmluZ3MlMjBuZWNrbGFjZSUyMGdvbGR8ZW58MHx8fHwxNzg5MDEyNTE4fDA&ixlib=rb-4.1.0&q=85"
    ]
}

# Extensive Categorical Data Dictionaries for Procedural Look Generation
DATA_DICTIONARY = {
    "tops": {
        "indian_male": [
            ("Raw Silk Bandhgala Jacket with Zari Weave", "Sabyasachi Neo-Line", "Mulberry Raw Silk", "Emerald Noir", "#064e3b", "$640"),
            ("Asymmetrical Layered Angrakha Kurta", "Tarun Tahiliani Atelier", "Chanderi Tissue & Linen", "Deep Forest Green", "#022c22", "$480"),
            ("Intricately Threaded Resham Sherwani", "Manish Malhotra Bespoke", "Matka Silk & Velvet", "Midnight Emerald", "#092e20", "$920"),
            ("Short Nehru Waistcoat with Cyber Pin Collar", "Raghavendra Rathore Jodhpur", "Worsted Wool & Silk", "Jade Malachite", "#059669", "$390"),
            ("Modern Mirror-Embroidered Kurta Set", "Falguni Shane Peacock", "Organza Georgette", "Bottle Green Glaze", "#044733", "$550"),
            ("Brocade Jacquard Achkan with Jewel Placket", "JJ Valaya Royal", "Banarasi Brocade", "Antique Emerald Gold", "#0f3e2e", "$780")
        ],
        "indian_female": [
            ("Sequined Organza Lehenga Blouse & Drape", "Sabyasachi Heritage", "Pure Organza & Glass Beads", "Emerald Crystal", "#10b981", "$890"),
            ("Sculpted Velvet Corset Kurti with Zardozi", "Tarun Tahiliani Modern", "Micro-Velvet & Zari", "Deep Forest Velvet", "#064e3b", "$720"),
            ("Pre-Draped Silk Saree with Metal Bustier", "Amit Aggarwal Couture", "Metallic Polymer & Handloom Silk", "Cyber Emerald Sheen", "#059669", "$980"),
            ("Hand-Embroidered Anarkali Bodice with Chiffon", "Manish Malhotra Vault", "Pure Silk Chiffon", "Pine Emerald", "#022c22", "$850"),
            ("Banarasi Katan Silk Blouse with Gota Patti", "Raw Mango Handcraft", "Katan Silk Handloom", "Emerald Moss", "#047857", "$460"),
            ("Indo-Western Cape Top with Crystal Fringe", "Falguni Shane Peacock", "Tulle & Swarovski Crystals", "Glacial Mint Emerald", "#34d399", "$670")
        ],
        "western_male": [
            ("Sculpted Oversized Tailored Blazer", "Balenciaga Haute Cyber", "Italian Virgin Wool", "Obsidian Emerald", "#0f1713", "$780"),
            ("Heavyweight Boxy Cyber Hooded Overshirt", "Fear of God Eternal", "Double-Faced Cashmere", "Dark Slate", "#1e293b", "$420"),
            ("Bonded Techwear Shell Jacket with Magnet Closures", "Acronym Cyber-Tech", "3-Layer GORE-TEX Pro", "Malachite Phantom", "#064e3b", "$890"),
            ("Double-Breasted Peak Lapel Velvet Smoking Jacket", "Tom Ford Private", "Silk Velvet", "Midnight Emerald Glow", "#065f46", "$1,250"),
            ("Structured Minimalist Mandarin Collar Overshirt", "Lemaire Edition", "Crisp Cotton Poplin", "Smoked Pine", "#044733", "$360"),
            ("Relaxed Drop-Shoulder Trench with Leather Trim", "Bottega Veneta Studio", "Technical Gabardine", "Dark Olive Obsidian", "#13231b", "$990")
        ],
        "western_female": [
            ("Asymmetric Hourglass Tailored Blazer", "Mugler Structural", "Wool Elastane Crepe", "Obsidian Emerald", "#0f1713", "$940"),
            ("Silk Crepe Drape Neck Camisole & Crop Jacket", "Saint Laurent Rive", "100% Silk Morocain", "Emerald Jewel", "#059669", "$620"),
            ("Sculptural Oversized Trench with High Belt", "The Row Minimalist", "Water-Repellent Double Silk", "Deep Malachite", "#022c22", "$1,450"),
            ("Cropped Structured Leather Biker with Emerald Sheen", "Rick Owens Dark", "Lambskin & Waxed Canvas", "Metallic Pine", "#064e3b", "$1,120"),
            ("Fluid Satin Draped Blazer Vest", "Jacquemus Silhouette", "Heavy Viscose Satin", "Mint Emerald Light", "#10b981", "$510"),
            ("Off-Shoulder Sculpted Evening Corset Top", "Alexander McQueen Vault", "Silk Faille & Boning", "Midnight Velvet", "#092e20", "$870")
        ]
    },
    "bottoms": {
        "indian_male": [
            ("Tapered Pleated Jodhpur Breeches", "Rathore Heritage", "Italian Stretch Chino", "Onyx Black", "#09090b", "$280"),
            ("Slim-Fit Silk Churidar Trousers", "Sabyasachi Bespoke", "Pure Mulberry Silk", "Deep Pine", "#064e3b", "$220"),
            ("Pleated Cowl Dhoti Slacks with Pocket Detail", "Tahiliani Modern", "Modal Georgette", "Charcoal Slate", "#18181b", "$310"),
            ("Tailored Formal Straight-Cut Kurta Pants", "Manyavar Royal", "Linen Silk Blend", "Jet Obsidian", "#0a0a0a", "$180")
        ],
        "indian_female": [
            ("Flared Micro-Pleated Silk Ghagra Skirt", "Sabyasachi Heritage", "Raw Silk & Can-Can Lining", "Emerald Brocade", "#047857", "$820"),
            ("Wide-Leg Velvet Sharara with Zari Hem", "Manish Malhotra Luxe", "Micro-Velvet & Brocade", "Forest Midnight", "#022c22", "$640"),
            ("Sculpted Tulip Dhoti Pants with Metal Trim", "Amit Aggarwal Modern", "Stretch Poly-Silk", "Obsidian Sheen", "#0f1713", "$380"),
            ("High-Waist Handloom Banarasi Tiered Palazzo", "Raw Mango Weaver", "Pure Banarasi Silk", "Rich Emerald Gold", "#065f46", "$490")
        ],
        "western_male": [
            ("Wide-Leg Tailored Pleated Wool Trousers", "The Row Men", "Super 130s Wool", "Obsidian Matte", "#0f1713", "$520"),
            ("Modular Cyberpunk Cargoes with Magnetic Webbing", "Acronym Tech", "Dryskin Technical Twill", "Dark Charcoal", "#18181b", "$460"),
            ("Relaxed Fit High-Rise Flared Slacks", "Bottega Veneta", "Heavy Gabardine", "Midnight Forest", "#064e3b", "$580"),
            ("Straight-Leg Japanese Raw Selvedge Denim", "Visvim Craft", "14oz Indigo-Black Denim", "Raw Obsidian", "#090d0b", "$390")
        ],
        "western_female": [
            ("High-Rise Wide Flared Tailored Trousers", "Saint Laurent Paris", "Grain de Poudre Wool", "Obsidian Black", "#09090b", "$620"),
            ("Fluid Floor-Sweeping Silk Satin Trousers", "The Row Minimalist", "Heavy Silk Satin", "Emerald Deep", "#064e3b", "$740"),
            ("Sculpted Tapered Cigarette Pants", "Mugler Studio", "Bi-Stretch Wool Crepe", "Dark Onyx", "#111827", "$430"),
            ("High-Slit Asymmetric Modular Maxi Skirt", "Rick Owens", "Tech Poplin", "Carbon Forest", "#022c22", "$510")
        ]
    },
    "footwear": [
        ("Limited Cyber-Luxe Sneaker Drop 'Emerald Jordan 1'", "Nike x Off-White Lab", "Full-Grain Leather & Icy Translucent Sole", "Emerald Glaze", "#10b981", "$320"),
        ("Handcrafted Embroidered Zardozi Mojaris", "Sabyasachi Footwear Guild", "Fine Suede & Antique Gold Thread", "Midnight Velvet", "#064e3b", "$280"),
        ("Brushed Italian Leather Lug-Sole Derby Shoes", "Prada Monolith Studio", "Spazzolato Brushed Calfskin", "Gloss Obsidian", "#09090b", "$890"),
        ("Emerald Velvet Horsebit Loafers with Gold Hardware", "Gucci Heritage Lab", "Silk Velvet & Leather Lining", "Forest Emerald", "#047857", "$790"),
        ("Cyberpunk High-Top Sneaker 'Aura Matrix 01'", "Balenciaga Runner Lab", "Mesh & Polyurethane Composite", "Cyber Chrome & Emerald", "#059669", "$850"),
        ("Sculpted Ankle-Strap Stiletto Pumps", "Amina Muaddi Studio", "Emerald Satin & Crystal Flare", "Vibrant Emerald", "#10b981", "$740")
    ],
    "eyewear": [
        ("Geometric Titanium Emerald Tint Aviators", "Gentle Monster Haute", "Beta-Titanium & Emerald UV400", "Cyber Emerald", "#10b981", "$380"),
        ("Hexagonal Wireframe Minimalist Shades", "Matsuda Eyewear Japan", "Palladium Plated & Smoked Lens", "Silver Chrome", "#94a3b8", "$460"),
        ("Cat-Eye Sculpted Cyber Acetate Shades", "Jacques Marie Mage", "10mm Cured Japanese Acetate", "Onyx Black & Emerald", "#064e3b", "$620"),
        ("Rimless Emerald Edge Polarized Shield", "Balenciaga Eyewear Lab", "Ultralight Nylon Lens", "Neon Emerald", "#34d399", "$410"),
        ("Vintage Oval Tortoiseshell & Gold Frames", "Oliver Peoples Bespoke", "Handcrafted Acetate & 18K Gold Plating", "Warm Amber & Pine", "#047857", "$390")
    ],
    "wristwear": [
        ("Damascus Steel Tourbillon Chronometer 'Aura-01'", "Audemars Piguet Custom Lab", "Forged Carbon & Damascus Steel with Emerald Rotor", "Dark Malachite", "#064e3b", "$14,500"),
        ("Royal Polki Diamond & Emerald Brooch / Cuff", "Sabyasachi Jewelry Vault", "22K Yellow Gold, Uncut Diamonds & Zambian Emeralds", "Imperial Gold", "#d97706", "$6,800"),
        ("Brushed 24K Gold & Emerald Signet Ring + Micro-Chain", "Cartier High Jewelry", "Solid 18K Brushed Gold & Natural Colombian Emerald", "Brushed Gold", "#eab308", "$4,200"),
        ("Minimalist Cybernetic Platinum Wrist Cuff", "Tiffany & Co. Titan", "Pure Platinum & Black Ceramic Inlay", "Platinum Slate", "#cbd5e1", "$2,900"),
        ("Kundan & Basra Pearl Multi-Strand Choker / Bracelet", "Amrapali Jaipur Royal", "Kundan Meenakari & Natural Pearls", "Antique Ivory Gold", "#fef08a", "$3,600")
    ],
    "grooming": [
        "Sculpted Low Skin Fade with Defined Precision Beard Contour and Beard Oil sheen.",
        "Sleek Center-Part Architectural Bun with Jasmine Pins and Dewy Glass Skin highlight.",
        "Textured Cyber Crop with Matte Clay finish and Subtle Brow Architecture.",
        "Regal Slicked-Back Pompadour with Natural Gloss Pomade and Royal Stubble.",
        "Sculptural High Ponytail with Emerald Velvet Ribbon and Sharp Graphic Eyeliner.",
        "Layered Soft Wavy Flow with Sea-Salt Mist texture and Hydrated Velvet Matte skin tone."
    ]
}

# Color theory schemes
COLOR_THEORIES = [
    ColorHarmony(
        scheme_name="Monochromatic Emerald Aura",
        dominant_hex="#090d0b",
        secondary_hex="#064e3b",
        accent_hex="#10b981",
        contrast_ratio="14.2:1 (AAA High-Tech)",
        theory_description="Deep dark obsidian ground anchor paired with tiered botanical emerald midtones and high-frequency neon emerald focal accents."
    ),
    ColorHarmony(
        scheme_name="Royal Gold & Malachite Contrast",
        dominant_hex="#042f2e",
        secondary_hex="#d97706",
        accent_hex="#34d399",
        contrast_ratio="12.8:1 (AAA Regal)",
        theory_description="Jeweled malachite green foundation elevated with 24K warm gold reflections for auspicious luxury and imperial elegance."
    ),
    ColorHarmony(
        scheme_name="Cyberpunk Stealth & Chrome",
        dominant_hex="#030712",
        secondary_hex="#1e293b",
        accent_hex="#06b6d4",
        contrast_ratio="15.6:1 (AAA Stealth)",
        theory_description="Tactical obsidian carbon base balanced with icy cyan and platinum cyber accents to sharpen silhouettes."
    ),
    ColorHarmony(
        scheme_name="Crimson Jewel & Emerald Duotone",
        dominant_hex="#091e14",
        secondary_hex="#881337",
        accent_hex="#10b981",
        contrast_ratio="11.4:1 (AA+ Complementary)",
        theory_description="Complementary dual-temperature tension combining deep ruby crimson textiles against sharp emerald trim."
    )
]

SKIN_TYPES = ["fair", "olive", "deep"]
BODY_TYPES = ["athletic", "muscular", "soft"]
HAIR_TYPES = ["short", "textured", "long", "curly"]
FACE_SHAPES = ["oval", "square", "heart", "diamond"]
OCCASIONS = [
    "Red Carpet Gala",
    "Cyber Streetwear Drop",
    "Royal Festive Wedding",
    "Executive Board Soiree",
    "Modern Sangeet & Reception",
    "Futuristic Cocktail Lounge"
]


def generate_144_matrix() -> List[FashionLook]:
    """
    Procedurally generates 144+ uniquely configured style payloads across:
    Skin (3) * Body (3) * Hair (4) = 36 base profiles
    Each profile spawns 4 distinct look styles (Indian Male, Indian Female, Western Male, Western Female, Fusion)
    36 * 4 = 144 complete, multi-piece looks with color theory and biometric matching.
    """
    looks: List[FashionLook] = []
    look_counter = 101

    for s_idx, skin in enumerate(SKIN_TYPES):
        for b_idx, body in enumerate(BODY_TYPES):
            for h_idx, hair in enumerate(HAIR_TYPES):
                # Base Profile Key (36 base profiles)
                profile_key = f"{skin}_{body}_{hair}"
                
                # 4 secondary style inject variations per profile = 144 looks
                for v_idx in range(4):
                    face_shape = FACE_SHAPES[(s_idx + b_idx + h_idx + v_idx) % len(FACE_SHAPES)]
                    look_code = f"AS-{look_counter}"
                    look_counter += 1
                    
                    # Distribute across cultural and gender combinations
                    if v_idx == 0:
                        gender = "male"
                        culture = "indian"
                        category_key = "indian_male"
                        title_prefix = "Maharaja Emerald"
                    elif v_idx == 1:
                        gender = "female"
                        culture = "indian"
                        category_key = "indian_female"
                        title_prefix = "Regal Rani Heritage"
                    elif v_idx == 2:
                        gender = "male"
                        culture = "western"
                        category_key = "western_male"
                        title_prefix = "Cyber-Luxe Tailored"
                    else:
                        gender = "female"
                        culture = "western"
                        category_key = "western_female"
                        title_prefix = "Neo-Matrix Haute"
                    
                    # Select hero image
                    hero_img_list = IMAGES_BANK[category_key]
                    hero_image = hero_img_list[(s_idx * 3 + b_idx * 2 + h_idx + v_idx) % len(hero_img_list)]
                    
                    # Top
                    top_options = DATA_DICTIONARY["tops"][category_key]
                    top_tuple = top_options[(s_idx + h_idx + v_idx) % len(top_options)]
                    top_piece = ItemPiece(
                        category="Top Apparel",
                        name=top_tuple[0],
                        brand_or_label=top_tuple[1],
                        material=top_tuple[2],
                        color_name=top_tuple[3],
                        color_hex=top_tuple[4],
                        image_url=hero_image,
                        style_note=f"Engineered specifically for {body} silhouettes with {hair} styling drape.",
                        price_tag=top_tuple[5]
                    )
                    
                    # Bottom
                    bottom_options = DATA_DICTIONARY["bottoms"][category_key]
                    bottom_tuple = bottom_options[(b_idx + v_idx) % len(bottom_options)]
                    bottom_piece = ItemPiece(
                        category="Bottom Cut",
                        name=bottom_tuple[0],
                        brand_or_label=bottom_tuple[1],
                        material=bottom_tuple[2],
                        color_name=bottom_tuple[3],
                        color_hex=bottom_tuple[4],
                        image_url=hero_image,
                        style_note="Structured geometric cut providing optimal vertical alignment.",
                        price_tag=bottom_tuple[5]
                    )
                    
                    # Footwear
                    foot_options = DATA_DICTIONARY["footwear"]
                    foot_tuple = foot_options[(s_idx + b_idx + v_idx) % len(foot_options)]
                    foot_img = IMAGES_BANK["shoes"][(v_idx + s_idx) % len(IMAGES_BANK["shoes"])]
                    foot_piece = ItemPiece(
                        category="Footwear Drop",
                        name=foot_tuple[0],
                        brand_or_label=foot_tuple[1],
                        material=foot_tuple[2],
                        color_name=foot_tuple[3],
                        color_hex=foot_tuple[4],
                        image_url=foot_img,
                        style_note="Cushioned luxury sole with signature emerald under-glow detailing.",
                        price_tag=foot_tuple[5]
                    )
                    
                    # Eyewear
                    eye_options = DATA_DICTIONARY["eyewear"]
                    eye_tuple = eye_options[(h_idx + v_idx) % len(eye_options)]
                    eye_img = IMAGES_BANK["eyewear"][(v_idx + h_idx) % len(IMAGES_BANK["eyewear"])]
                    eye_piece = ItemPiece(
                        category="Eyewear Optics",
                        name=eye_tuple[0],
                        brand_or_label=eye_tuple[1],
                        material=eye_tuple[2],
                        color_name=eye_tuple[3],
                        color_hex=eye_tuple[4],
                        image_url=eye_img,
                        style_note=f"Harmonized for {face_shape.upper()} facial geometry to counterbalance facial proportions.",
                        price_tag=eye_tuple[5]
                    )
                    
                    # Wristwear / Jewelry
                    wrist_options = DATA_DICTIONARY["wristwear"]
                    wrist_tuple = wrist_options[(s_idx + v_idx) % len(wrist_options)]
                    wrist_img = IMAGES_BANK["wristwear"][(v_idx + s_idx) % len(IMAGES_BANK["wristwear"])]
                    wrist_piece = ItemPiece(
                        category="Wristwear & Jewels",
                        name=wrist_tuple[0],
                        brand_or_label=wrist_tuple[1],
                        material=wrist_tuple[2],
                        color_name=wrist_tuple[3],
                        color_hex=wrist_tuple[4],
                        image_url=wrist_img,
                        style_note=f"High-frequency precious metal selected to complement {skin.upper()} undertones.",
                        price_tag=wrist_tuple[5]
                    )
                    
                    # Color Harmony
                    color_harmony = COLOR_THEORIES[(s_idx + b_idx + v_idx) % len(COLOR_THEORIES)]
                    
                    # Occasion
                    occasion = OCCASIONS[(s_idx * 2 + v_idx) % len(OCCASIONS)]
                    
                    # Grooming
                    grooming_note = DATA_DICTIONARY["grooming"][(h_idx + v_idx) % len(DATA_DICTIONARY["grooming"])]
                    
                    # Biometric match score
                    match_rate = 94.0 + ((s_idx * 7 + b_idx * 5 + h_idx * 3 + v_idx * 11) % 58) / 10.0
                    
                    title = f"{title_prefix} {top_tuple[0].split()[0]} & {bottom_tuple[0].split()[0]} Ensemble"
                    description = f"Engineered look configuration for {skin.capitalize()} tone, {body.capitalize()} build, and {hair.capitalize()} hair profile. Featuring {color_harmony.scheme_name} color theory."
                    
                    look = FashionLook(
                        look_code=look_code,
                        title=title,
                        gender=gender,
                        culture=culture,
                        occasion=occasion,
                        skin_type=skin,
                        body_type=body,
                        hair_type=hair,
                        face_shape=face_shape,
                        hero_image=hero_image,
                        description=description,
                        color_harmony=color_harmony,
                        pieces=[top_piece, bottom_piece, foot_piece, eye_piece, wrist_piece],
                        accessories_summary=f"{eye_piece.name} + {wrist_piece.name}",
                        grooming_note=grooming_note,
                        biometric_match_rate=round(match_rate, 1),
                        tags=[culture, gender, skin, body, face_shape, occasion.lower().replace(" ", "-")]
                    )
                    looks.append(look)

    return looks


# Precompute lookup matrix for high performance
MATRIX_CATALOG = generate_144_matrix()


def calculate_facial_geometry(face_shape: str, skin_tone: str) -> FacialMetrics:
    """Returns detailed facial geometry analysis, accessory match, and grooming metrics."""
    shape = face_shape.lower()
    
    eyewear_map = {
        "oval": "Universal fit: Geometric Emerald Aviators, Hexagonal wireframes, and Cyber Shields.",
        "square": "Round Wireframes, Oval Cat-Eye Optics, and Curved browline sunglasses to soften angular jaw lines.",
        "heart": "Light metal wire aviators, rimless bottom frames, and light cat-eye silhouettes to balance forehead width.",
        "diamond": "Oval oversized sunglasses, wide browline frames, and sculpted bold acetate optics."
    }
    
    grooming_map = {
        "oval": "Balanced proportions allow for sculpted fades, swept pompadours, or textured high buns.",
        "square": "Softer round beard trim or textured layered fringe to harmonize square jaw geometry.",
        "heart": "Fuller chin-length styling or side-swept locks to add volume to the lower third of the face.",
        "diamond": "Medium textured crops or soft curtain fringe to widen forehead and jawline harmony."
    }
    
    metal_map = {
        "fair": "Platinum & Emerald Cyber Steel, Glacial White Gold, Smoked Titanium",
        "olive": "Brushed 24K Gold & Natural Colombian Emerald, Warm Bronze, Antique Copper",
        "deep": "Imperial 22K Gold, Rich Zambian Emerald, High-Polish Yellow Brass & Diamond"
    }
    
    return FacialMetrics(
        face_shape=face_shape.capitalize(),
        skin_tone=skin_tone.capitalize(),
        undertone="Warm Golden" if skin_tone == "olive" else ("Cool Pink" if skin_tone == "fair" else "Deep Rich Neutral"),
        jawline_angle="Sculpted 118° Defined" if shape in ["square", "diamond"] else "Soft Curved 126°",
        symmetry_score=97.6 if shape == "oval" else (96.2 if shape == "square" else 95.8),
        eyewear_recommendation=eyewear_map.get(shape, eyewear_map["oval"]),
        grooming_advice=grooming_map.get(shape, grooming_map["oval"]),
        metal_harmony=metal_map.get(skin_tone, metal_map["olive"])
    )
