import type { FashionLook, ItemPiece, ColorHarmony, FacialMetrics } from '@/types/fashion';

export const IMAGES_BANK = {
  indian_male: [
    "https://images.unsplash.com/photo-1781106785439-306653a7066d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzN8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBldGhuaWMlMjBrdXJ0YSUyMHNoZXJ3YW5pJTIwbWVufGVufDB8fHx8MTc4OTAxMjUxM3ww&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1781106784087-d6f4432ad721?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzN8MHwxfHNlYXJjaHwzfHxpbmRpYW4lMjBldGhuaWMlMjBrdXJ0YSUyMHNoZXJ3YW5pJTIwbWVufGVufDB8fHx8MTc4OTAxMjUxM3ww&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1785612516109-ec479a684113?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzN8MHwxfHNlYXJjaHw0fHxpbmRpYW4lMjBldGhuaWMlMjBrdXJ0YSUyMHNoZXJ3YW5pJTIwbWVufGVufDB8fHx8MTc4OTAxMjUxM3ww&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1781106784325-52bc05c289aa?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzN8MHwxfHNlYXJjaHwyfHxpbmRpYW4lMjBldGhuaWMlMjBrdXJ0YSUyMHNoZXJ3YW5pJTIwbWVufGVufDB8fHx8MTc4OTAxMjUxM3ww&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1522169092203-1cce6d311a0b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtZW5zd2VhciUyMGx1eHVyeSUyMGt1cnRhJTIwc2hlcndhbml8ZW58MHx8fHwxNzg5MDEyNDgwfDA&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1783188223126-69e5d0b56f39?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHw0fHxpbmRpYW4lMjBtZW5zd2VhciUyMGx1eHVyeSUyMGt1cnRhJTIwc2hlcndhbml8ZW58MHx8fHwxNzg5MDEyNDgwfDA&ixlib=rb-4.1.0&q=85"
  ],
  indian_female: [
    "https://images.unsplash.com/photo-1677691257005-9d69ab23f485?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MDV8MHwxfHNlYXJjaHw0fHxpbmRpYW4lMjBsdXh1cnklMjBzYXJlZSUyMGxlaGVuZ2ElMjB3b21lbnxlbnwwfHx8fDE3ODkwMTI1MTN8MA&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/flagged/photo-1580141043903-ef7df571364b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MDV8MHwxfHNlYXJjaHwyfHxpbmRpYW4lMjBsdXh1cnklMjBzYXJlZSUyMGxlaGVuZ2ElMjB3b21lbnxlbnwwfHx8fDE3ODkwMTI1MTN8MA&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1654764746225-e63f5e90facd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MDV8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBsdXh1cnklMjBzYXJlZSUyMGxlaGVuZ2ElMjB3b21lbnxlbnwwfHx8fDE3ODkwMTI1MTN8MA&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1740431377901-c2f28d50c759?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MDV8MHwxfHNlYXJjaHwzfHxpbmRpYW4lMjBsdXh1cnklMjBzYXJlZSUyMGxlaGVuZ2ElMjB3b21lbnxlbnwwfHx8fDE3ODkwMTI1MTN8MA&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1668371459824-094a960a227d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwzfHxpbmRpYW4lMjB3b21lbnN3ZWFyJTIwc2FyZWUlMjBsZWhlbmdhfGVufDB8fHx8MTc4OTAxMjQ4MHww&ixlib=rb-4.1.0&q=85"
  ],
  western_male: [
    "https://images.unsplash.com/photo-1697319292673-f18acff2e959?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDZ8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBtb2Rlcm4lMjB3ZXN0ZXJuJTIwb3V0Zml0JTIwbWVufGVufDB8fHx8MTc4OTAxMjUxM3ww&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1677188531651-93bac644e2a4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDZ8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBtb2Rlcm4lMjB3ZXN0ZXJuJTIwb3V0Zml0JTIwbWVufGVufDB8fHx8MTc4OTAxMjUxM3ww&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1602622573203-f27d27a3a945?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDZ8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjB3ZXN0ZXJuJTIwb3V0Zml0JTIwbWVufGVufDB8fHx8MTc4OTAxMjUxM3ww&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1532332248682-206cc786359f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzOTB8MHwxfHNlYXJjaHwxfHxtZW5zd2VhciUyMGx1eHVyeSUyMHN0cmVldHdlYXIlMjBvdXRmaXR8ZW58MHx8fHwxNzg5MDEyNDgwfDA&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1620834767673-19f69709a716?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzOTB8MHwxfHNlYXJjaHw0fHxtZW5zd2VhciUyMGx1eHVyeSUyMHN0cmVldHdlYXIlMjBvdXRmaXR8ZW58MHx8fHwxNzg5MDEyNDgwfDA&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1559697242-a465f2578a95?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzOTB8MHwxfHNlYXJjaHwyfHxtZW5zd2VhciUyMGx1eHVyeSUyMHN0cmVldHdlYXIlMjBvdXRmaXR8ZW58MHx8fHwxNzg5MDEyNDgwfDA&ixlib=rb-4.1.0&q=85"
  ],
  western_female: [
    "https://images.unsplash.com/photo-1602580170250-cdfc887a56ff?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBzdHJlZXR3ZWFyJTIwYmxhemVyJTIwd29tZW4lMjBmYXNoaW9ufGVufDB8fHx8MTc4OTAxMjUxM3ww&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1719293259782-0725d0d206bb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBzdHJlZXR3ZWFyJTIwYmxhemVyJTIwd29tZW4lMjBmYXNoaW9ufGVufDB8fHx8MTc4OTAxMjUxM3ww&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1617647858823-2424b6dc472f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzdHJlZXR3ZWFyJTIwYmxhemVyJTIwd29tZW4lMjBmYXNoaW9ufGVufDB8fHx8MTc4OTAxMjUxM3ww&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1719293259790-69523ed58a86?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBzdHJlZXR3ZWFyJTIwYmxhemVyJTIwd29tZW4lMjBmYXNoaW9ufGVufDB8fHx8MTc4OTAxMjUxM3ww&ixlib=rb-4.1.0&q=85"
  ],
  shoes: [
    "https://images.unsplash.com/photo-1618677831708-0e7fda3148b4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBzbmVha2VycyUyMHNob2VzJTIwZmFzaGlvbnxlbnwwfHx8fDE3ODkwMTI1MTh8MA&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1575176647993-a8a6f538e940?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzbmVha2VycyUyMHNob2VzJTIwZmFzaGlvbnxlbnwwfHx8fDE3ODkwMTI1MTh8MA&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1575176648002-f2021e56b375?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBzbmVha2VycyUyMHNob2VzJTIwZmFzaGlvbnxlbnwwfHx8fDE3ODkwMTI1MTh8MA&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1543652711-77eeb35ae548?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBzbmVha2VycyUyMHNob2VzJTIwZmFzaGlvbnxlbnwwfHx8fDE3ODkwMTI1MTh8MA&ixlib=rb-4.1.0&q=85"
  ],
  eyewear: [
    "https://images.unsplash.com/photo-1599705709640-9f9eb5964485?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwzfHxkZXNpZ25lciUyMHN1bmdsYXNzZXMlMjBleWV3ZWFyJTIwbW9kZWx8ZW58MHx8fHwxNzg5MDEyNTE4fDA&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1556015048-4d3aa10df74c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHw0fHxkZXNpZ25lciUyMHN1bmdsYXNzZXMlMjBleWV3ZWFyJTIwbW9kZWx8ZW58MHx8fHwxNzg5MDEyNTE4fDA&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1611824204322-24963b44d68b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwyfHxkZXNpZ25lciUyMHN1bmdsYXNzZXMlMjBleWV3ZWFyJTIwbW9kZWx8ZW58MHx8fHwxNzg5MDEyNTE4fDA&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1605813808456-26c16c0dfb77?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMHN1bmdsYXNzZXMlMjBleWV3ZWFyJTIwbW9kZWx8ZW58MHx8fHwxNzg5MDEyNTE4fDA&ixlib=rb-4.1.0&q=85"
  ],
  wristwear: [
    "https://images.unsplash.com/photo-1782012133180-91aca4bcf9ad?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaCUyMHdyaXN0d2VhciUyMGNocm9ub21ldGVyfGVufDB8fHx8MTc4OTAxMjUxOHww&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1651160670627-2896ddf7822f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTF8MHwxfHNlYXJjaHwzfHxldGhuaWMlMjBqZXdlbHJ5JTIwZWFycmluZ3MlMjBuZWNrbGFjZSUyMGdvbGR8ZW58MHx8fHwxNzg5MDEyNTE4fDA&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTF8MHwxfHNlYXJjaHwyfHxldGhuaWMlMjBqZXdlbHJ5JTIwZWFycmluZ3MlMjBuZWNrbGFjZSUyMGdvbGR8ZW58MHx8fHwxNzg5MDEyNTE4fDA&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1694062045776-f48d9b6de57e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTF8MHwxfHNlYXJjaHw0fHxldGhuaWMlMjBqZXdlbHJ5JTIwZWFycmluZ3MlMjBuZWNrbGFjZSUyMGdvbGR8ZW58MHx8fHwxNzg5MDEyNTE4fDA&ixlib=rb-4.1.0&q=85"
  ]
};

export const COLOR_THEORIES: ColorHarmony[] = [
  {
    scheme_name: "Monochromatic Emerald Aura",
    dominant_hex: "#090d0b",
    secondary_hex: "#064e3b",
    accent_hex: "#10b981",
    contrast_ratio: "14.2:1 (AAA High-Tech)",
    theory_description: "Deep dark obsidian ground anchor paired with tiered botanical emerald midtones and high-frequency neon emerald focal accents."
  },
  {
    scheme_name: "Royal Gold & Malachite Contrast",
    dominant_hex: "#042f2e",
    secondary_hex: "#d97706",
    accent_hex: "#34d399",
    contrast_ratio: "12.8:1 (AAA Regal)",
    theory_description: "Jeweled malachite green foundation elevated with 24K warm gold reflections for auspicious luxury and imperial elegance."
  },
  {
    scheme_name: "Cyberpunk Stealth & Chrome",
    dominant_hex: "#030712",
    secondary_hex: "#1e293b",
    accent_hex: "#06b6d4",
    contrast_ratio: "15.6:1 (AAA Stealth)",
    theory_description: "Tactical obsidian carbon base balanced with icy cyan and platinum cyber accents to sharpen silhouettes."
  },
  {
    scheme_name: "Crimson Jewel & Emerald Duotone",
    dominant_hex: "#091e14",
    secondary_hex: "#881337",
    accent_hex: "#10b981",
    contrast_ratio: "11.4:1 (AA+ Complementary)",
    theory_description: "Complementary dual-temperature tension combining deep ruby crimson textiles against sharp emerald trim."
  }
];

export const RAW_DICTIONARY = {
  tops: {
    indian_male: [
      { name: "Raw Silk Bandhgala Jacket with Zari Weave", brand: "Sabyasachi Neo-Line", mat: "Mulberry Raw Silk", color: "Emerald Noir", hex: "#064e3b", price: "$640" },
      { name: "Asymmetrical Layered Angrakha Kurta", brand: "Tarun Tahiliani Atelier", mat: "Chanderi Tissue & Linen", color: "Deep Forest Green", hex: "#022c22", price: "$480" },
      { name: "Intricately Threaded Resham Sherwani", brand: "Manish Malhotra Bespoke", mat: "Matka Silk & Velvet", color: "Midnight Emerald", hex: "#092e20", price: "$920" },
      { name: "Short Nehru Waistcoat with Cyber Pin Collar", brand: "Raghavendra Rathore Jodhpur", mat: "Worsted Wool & Silk", color: "Jade Malachite", hex: "#059669", price: "$390" },
      { name: "Modern Mirror-Embroidered Kurta Set", brand: "Falguni Shane Peacock", mat: "Organza Georgette", color: "Bottle Green Glaze", hex: "#044733", price: "$550" },
      { name: "Brocade Jacquard Achkan with Jewel Placket", brand: "JJ Valaya Royal", mat: "Banarasi Brocade", color: "Antique Emerald Gold", hex: "#0f3e2e", price: "$780" }
    ],
    indian_female: [
      { name: "Sequined Organza Lehenga Blouse & Drape", brand: "Sabyasachi Heritage", mat: "Pure Organza & Glass Beads", color: "Emerald Crystal", hex: "#10b981", price: "$890" },
      { name: "Sculpted Velvet Corset Kurti with Zardozi", brand: "Tarun Tahiliani Modern", mat: "Micro-Velvet & Zari", color: "Deep Forest Velvet", hex: "#064e3b", price: "$720" },
      { name: "Pre-Draped Silk Saree with Metal Bustier", brand: "Amit Aggarwal Couture", mat: "Metallic Polymer & Handloom Silk", color: "Cyber Emerald Sheen", hex: "#059669", price: "$980" },
      { name: "Hand-Embroidered Anarkali Bodice with Chiffon", brand: "Manish Malhotra Vault", mat: "Pure Silk Chiffon", color: "Pine Emerald", hex: "#022c22", price: "$850" },
      { name: "Banarasi Katan Silk Blouse with Gota Patti", brand: "Raw Mango Handcraft", mat: "Katan Silk Handloom", color: "Emerald Moss", hex: "#047857", price: "$460" },
      { name: "Indo-Western Cape Top with Crystal Fringe", brand: "Falguni Shane Peacock", mat: "Tulle & Swarovski Crystals", color: "Glacial Mint Emerald", hex: "#34d399", price: "$670" }
    ],
    western_male: [
      { name: "Sculpted Oversized Tailored Blazer", brand: "Balenciaga Haute Cyber", mat: "Italian Virgin Wool", color: "Obsidian Emerald", hex: "#0f1713", price: "$780" },
      { name: "Heavyweight Boxy Cyber Hooded Overshirt", brand: "Fear of God Eternal", mat: "Double-Faced Cashmere", color: "Dark Slate", hex: "#1e293b", price: "$420" },
      { name: "Bonded Techwear Shell Jacket with Magnet Closures", brand: "Acronym Cyber-Tech", mat: "3-Layer GORE-TEX Pro", color: "Malachite Phantom", hex: "#064e3b", price: "$890" },
      { name: "Double-Breasted Peak Lapel Velvet Smoking Jacket", brand: "Tom Ford Private", mat: "Silk Velvet", color: "Midnight Emerald Glow", hex: "#065f46", price: "$1,250" },
      { name: "Structured Minimalist Mandarin Collar Overshirt", brand: "Lemaire Edition", mat: "Crisp Cotton Poplin", color: "Smoked Pine", hex: "#044733", price: "$360" },
      { name: "Relaxed Drop-Shoulder Trench with Leather Trim", brand: "Bottega Veneta Studio", mat: "Technical Gabardine", color: "Dark Olive Obsidian", hex: "#13231b", price: "$990" }
    ],
    western_female: [
      { name: "Asymmetric Hourglass Tailored Blazer", brand: "Mugler Structural", mat: "Wool Elastane Crepe", color: "Obsidian Emerald", hex: "#0f1713", price: "$940" },
      { name: "Silk Crepe Drape Neck Camisole & Crop Jacket", brand: "Saint Laurent Rive", mat: "100% Silk Morocain", color: "Emerald Jewel", hex: "#059669", price: "$620" },
      { name: "Sculptural Oversized Trench with High Belt", brand: "The Row Minimalist", mat: "Water-Repellent Double Silk", color: "Deep Malachite", hex: "#022c22", price: "$1,450" },
      { name: "Cropped Structured Leather Biker with Emerald Sheen", brand: "Rick Owens Dark", mat: "Lambskin & Waxed Canvas", color: "Metallic Pine", hex: "#064e3b", price: "$1,120" },
      { name: "Fluid Satin Draped Blazer Vest", brand: "Jacquemus Silhouette", mat: "Heavy Viscose Satin", color: "Mint Emerald Light", hex: "#10b981", price: "$510" },
      { name: "Off-Shoulder Sculpted Evening Corset Top", brand: "Alexander McQueen Vault", mat: "Silk Faille & Boning", color: "Midnight Velvet", hex: "#092e20", price: "$870" }
    ]
  },
  bottoms: {
    indian_male: [
      { name: "Tapered Pleated Jodhpur Breeches", brand: "Rathore Heritage", mat: "Italian Stretch Chino", color: "Onyx Black", hex: "#09090b", price: "$280" },
      { name: "Slim-Fit Silk Churidar Trousers", brand: "Sabyasachi Bespoke", mat: "Pure Mulberry Silk", color: "Deep Pine", hex: "#064e3b", price: "$220" },
      { name: "Pleated Cowl Dhoti Slacks with Pocket Detail", brand: "Tahiliani Modern", mat: "Modal Georgette", color: "Charcoal Slate", hex: "#18181b", price: "$310" },
      { name: "Tailored Formal Straight-Cut Kurta Pants", brand: "Manyavar Royal", mat: "Linen Silk Blend", color: "Jet Obsidian", hex: "#0a0a0a", price: "$180" }
    ],
    indian_female: [
      { name: "Flared Micro-Pleated Silk Ghagra Skirt", brand: "Sabyasachi Heritage", mat: "Raw Silk & Can-Can Lining", color: "Emerald Brocade", hex: "#047857", price: "$820" },
      { name: "Wide-Leg Velvet Sharara with Zari Hem", brand: "Manish Malhotra Luxe", mat: "Micro-Velvet & Brocade", color: "Forest Midnight", hex: "#022c22", price: "$640" },
      { name: "Sculpted Tulip Dhoti Pants with Metal Trim", brand: "Amit Aggarwal Modern", mat: "Stretch Poly-Silk", color: "Obsidian Sheen", hex: "#0f1713", price: "$380" },
      { name: "High-Waist Handloom Banarasi Tiered Palazzo", brand: "Raw Mango Weaver", mat: "Pure Banarasi Silk", color: "Rich Emerald Gold", hex: "#065f46", price: "$490" }
    ],
    western_male: [
      { name: "Wide-Leg Tailored Pleated Wool Trousers", brand: "The Row Men", mat: "Super 130s Wool", color: "Obsidian Matte", hex: "#0f1713", price: "$520" },
      { name: "Modular Cyberpunk Cargoes with Magnetic Webbing", brand: "Acronym Tech", mat: "Dryskin Technical Twill", color: "Dark Charcoal", hex: "#18181b", price: "$460" },
      { name: "Relaxed Fit High-Rise Flared Slacks", brand: "Bottega Veneta", mat: "Heavy Gabardine", color: "Midnight Forest", hex: "#064e3b", price: "$580" },
      { name: "Straight-Leg Japanese Raw Selvedge Denim", brand: "Visvim Craft", mat: "14oz Indigo-Black Denim", color: "Raw Obsidian", hex: "#090d0b", price: "$390" }
    ],
    western_female: [
      { name: "High-Rise Wide Flared Tailored Trousers", brand: "Saint Laurent Paris", mat: "Grain de Poudre Wool", color: "Obsidian Black", hex: "#09090b", price: "$620" },
      { name: "Fluid Floor-Sweeping Silk Satin Trousers", brand: "The Row Minimalist", mat: "Heavy Silk Satin", color: "Emerald Deep", hex: "#064e3b", price: "$740" },
      { name: "Sculpted Tapered Cigarette Pants", brand: "Mugler Studio", mat: "Bi-Stretch Wool Crepe", color: "Dark Onyx", hex: "#111827", price: "$430" },
      { name: "High-Slit Asymmetric Modular Maxi Skirt", brand: "Rick Owens", mat: "Tech Poplin", color: "Carbon Forest", hex: "#022c22", price: "$510" }
    ]
  },
  footwear: [
    { name: "Limited Cyber-Luxe Sneaker Drop 'Emerald Jordan 1'", brand: "Nike x Off-White Lab", mat: "Full-Grain Leather & Icy Translucent Sole", color: "Emerald Glaze", hex: "#10b981", price: "$320" },
    { name: "Handcrafted Embroidered Zardozi Mojaris", brand: "Sabyasachi Footwear Guild", mat: "Fine Suede & Antique Gold Thread", color: "Midnight Velvet", hex: "#064e3b", price: "$280" },
    { name: "Brushed Italian Leather Lug-Sole Derby Shoes", brand: "Prada Monolith Studio", mat: "Spazzolato Brushed Calfskin", color: "Gloss Obsidian", hex: "#09090b", price: "$890" },
    { name: "Emerald Velvet Horsebit Loafers with Gold Hardware", brand: "Gucci Heritage Lab", mat: "Silk Velvet & Leather Lining", color: "Forest Emerald", hex: "#047857", price: "$790" },
    { name: "Cyberpunk High-Top Sneaker 'Aura Matrix 01'", brand: "Balenciaga Runner Lab", mat: "Mesh & Polyurethane Composite", color: "Cyber Chrome & Emerald", hex: "#059669", price: "$850" },
    { name: "Sculpted Ankle-Strap Stiletto Pumps", brand: "Amina Muaddi Studio", mat: "Emerald Satin & Crystal Flare", color: "Vibrant Emerald", hex: "#10b981", price: "$740" }
  ],
  eyewear: [
    { name: "Geometric Titanium Emerald Tint Aviators", brand: "Gentle Monster Haute", mat: "Beta-Titanium & Emerald UV400", color: "Cyber Emerald", hex: "#10b981", price: "$380" },
    { name: "Hexagonal Wireframe Minimalist Shades", brand: "Matsuda Eyewear Japan", mat: "Palladium Plated & Smoked Lens", color: "Silver Chrome", hex: "#94a3b8", price: "$460" },
    { name: "Cat-Eye Sculpted Cyber Acetate Shades", brand: "Jacques Marie Mage", mat: "10mm Cured Japanese Acetate", color: "Onyx Black & Emerald", hex: "#064e3b", price: "$620" },
    { name: "Rimless Emerald Edge Polarized Shield", brand: "Balenciaga Eyewear Lab", mat: "Ultralight Nylon Lens", color: "Neon Emerald", hex: "#34d399", price: "$410" },
    { name: "Vintage Oval Tortoiseshell & Gold Frames", brand: "Oliver Peoples Bespoke", mat: "Handcrafted Acetate & 18K Gold Plating", color: "Warm Amber & Pine", hex: "#047857", price: "$390" }
  ],
  wristwear: [
    { name: "Damascus Steel Tourbillon Chronometer 'Aura-01'", brand: "Audemars Piguet Custom Lab", mat: "Forged Carbon & Damascus Steel", color: "Dark Malachite", hex: "#064e3b", price: "$14,500" },
    { name: "Royal Polki Diamond & Emerald Brooch / Cuff", brand: "Sabyasachi Jewelry Vault", mat: "22K Gold, Uncut Diamonds & Zambian Emeralds", color: "Imperial Gold", hex: "#d97706", price: "$6,800" },
    { name: "Brushed 24K Gold & Emerald Signet Ring + Micro-Chain", brand: "Cartier High Jewelry", mat: "Solid 18K Brushed Gold & Colombian Emerald", color: "Brushed Gold", hex: "#eab308", price: "$4,200" },
    { name: "Minimalist Cybernetic Platinum Wrist Cuff", brand: "Tiffany & Co. Titan", mat: "Pure Platinum & Black Ceramic Inlay", color: "Platinum Slate", hex: "#cbd5e1", price: "$2,900" },
    { name: "Kundan & Basra Pearl Multi-Strand Choker / Bracelet", brand: "Amrapali Jaipur Royal", mat: "Kundan Meenakari & Natural Pearls", color: "Antique Ivory Gold", hex: "#fef08a", price: "$3,600" }
  ],
  grooming: [
    "Sculpted Low Skin Fade with Defined Precision Beard Contour and Emerald Beard Oil sheen.",
    "Sleek Center-Part Architectural Bun with Jasmine Pins and Dewy Glass Skin highlight.",
    "Textured Cyber Crop with Matte Clay finish and Subtle Brow Architecture.",
    "Regal Slicked-Back Pompadour with Natural Gloss Pomade and Royal Stubble.",
    "Sculptural High Ponytail with Emerald Velvet Ribbon and Sharp Graphic Eyeliner.",
    "Layered Soft Wavy Flow with Sea-Salt Mist texture and Hydrated Velvet Matte skin tone."
  ]
};

const SKIN_TYPES = ["fair", "olive", "deep"];
const BODY_TYPES = ["athletic", "muscular", "soft"];
const HAIR_TYPES = ["short", "textured", "long", "curly"];
const FACE_SHAPES = ["oval", "square", "heart", "diamond"];
const OCCASIONS = [
  "Red Carpet Gala",
  "Cyber Streetwear Drop",
  "Royal Festive Wedding",
  "Executive Board Soiree",
  "Modern Sangeet & Reception",
  "Futuristic Cocktail Lounge"
];

export function buildProcedural144Catalog(): FashionLook[] {
  const looks: FashionLook[] = [];
  let lookCounter = 101;

  for (let sIdx = 0; sIdx < SKIN_TYPES.length; sIdx++) {
    const skin = SKIN_TYPES[sIdx];
    for (let bIdx = 0; bIdx < BODY_TYPES.length; bIdx++) {
      const body = BODY_TYPES[bIdx];
      for (let hIdx = 0; hIdx < HAIR_TYPES.length; hIdx++) {
        const hair = HAIR_TYPES[hIdx];

        // 4 secondary style injections per profile = 36 * 4 = 144 looks
        for (let vIdx = 0; vIdx < 4; vIdx++) {
          const faceShape = FACE_SHAPES[(sIdx + bIdx + hIdx + vIdx) % FACE_SHAPES.length];
          const lookCode = `AS-${lookCounter++}`;

          let gender: 'male' | 'female';
          let culture: 'indian' | 'western' | 'fusion';
          let categoryKey: 'indian_male' | 'indian_female' | 'western_male' | 'western_female';
          let titlePrefix: string;

          if (vIdx === 0) {
            gender = 'male';
            culture = 'indian';
            categoryKey = 'indian_male';
            titlePrefix = 'Maharaja Emerald';
          } else if (vIdx === 1) {
            gender = 'female';
            culture = 'indian';
            categoryKey = 'indian_female';
            titlePrefix = 'Regal Rani Heritage';
          } else if (vIdx === 2) {
            gender = 'male';
            culture = 'western';
            categoryKey = 'western_male';
            titlePrefix = 'Cyber-Luxe Tailored';
          } else {
            gender = 'female';
            culture = 'western';
            categoryKey = 'western_female';
            titlePrefix = 'Neo-Matrix Haute';
          }

          const heroList = IMAGES_BANK[categoryKey];
          const heroImage = heroList[(sIdx * 3 + bIdx * 2 + hIdx + vIdx) % heroList.length];

          // Top
          const topList = RAW_DICTIONARY.tops[categoryKey];
          const topRaw = topList[(sIdx + hIdx + vIdx) % topList.length];
          const topPiece: ItemPiece = {
            category: "Top Apparel",
            name: topRaw.name,
            brand_or_label: topRaw.brand,
            material: topRaw.mat,
            color_name: topRaw.color,
            color_hex: topRaw.hex,
            image_url: heroImage,
            style_note: `Engineered specifically for ${body} silhouettes with ${hair} styling drape.`,
            price_tag: topRaw.price
          };

          // Bottom
          const botList = RAW_DICTIONARY.bottoms[categoryKey];
          const botRaw = botList[(bIdx + vIdx) % botList.length];
          const botPiece: ItemPiece = {
            category: "Bottom Cut",
            name: botRaw.name,
            brand_or_label: botRaw.brand,
            material: botRaw.mat,
            color_name: botRaw.color,
            color_hex: botRaw.hex,
            image_url: heroImage,
            style_note: "Structured geometric cut providing optimal vertical alignment.",
            price_tag: botRaw.price
          };

          // Footwear
          const footList = RAW_DICTIONARY.footwear;
          const footRaw = footList[(sIdx + bIdx + vIdx) % footList.length];
          const footImg = IMAGES_BANK.shoes[(vIdx + sIdx) % IMAGES_BANK.shoes.length];
          const footPiece: ItemPiece = {
            category: "Footwear Drop",
            name: footRaw.name,
            brand_or_label: footRaw.brand,
            material: footRaw.mat,
            color_name: footRaw.color,
            color_hex: footRaw.hex,
            image_url: footImg,
            style_note: "Cushioned luxury sole with signature emerald under-glow detailing.",
            price_tag: footRaw.price
          };

          // Eyewear
          const eyeList = RAW_DICTIONARY.eyewear;
          const eyeRaw = eyeList[(hIdx + vIdx) % eyeList.length];
          const eyeImg = IMAGES_BANK.eyewear[(vIdx + hIdx) % IMAGES_BANK.eyewear.length];
          const eyePiece: ItemPiece = {
            category: "Eyewear Optics",
            name: eyeRaw.name,
            brand_or_label: eyeRaw.brand,
            material: eyeRaw.mat,
            color_name: eyeRaw.color,
            color_hex: eyeRaw.hex,
            image_url: eyeImg,
            style_note: `Harmonized for ${faceShape.toUpperCase()} facial geometry to counterbalance facial proportions.`,
            price_tag: eyeRaw.price
          };

          // Wristwear
          const wristList = RAW_DICTIONARY.wristwear;
          const wristRaw = wristList[(sIdx + vIdx) % wristList.length];
          const wristImg = IMAGES_BANK.wristwear[(vIdx + sIdx) % IMAGES_BANK.wristwear.length];
          const wristPiece: ItemPiece = {
            category: "Wristwear & Jewels",
            name: wristRaw.name,
            brand_or_label: wristRaw.brand,
            material: wristRaw.mat,
            color_name: wristRaw.color,
            color_hex: wristRaw.hex,
            image_url: wristImg,
            style_note: `High-frequency precious metal selected to complement ${skin.toUpperCase()} undertones.`,
            price_tag: wristRaw.price
          };

          const colorHarmony = COLOR_THEORIES[(sIdx + bIdx + vIdx) % COLOR_THEORIES.length];
          const occasion = OCCASIONS[(sIdx * 2 + vIdx) % OCCASIONS.length];
          const groomingNote = RAW_DICTIONARY.grooming[(hIdx + vIdx) % RAW_DICTIONARY.grooming.length];
          const matchRate = 94.0 + ((sIdx * 7 + bIdx * 5 + hIdx * 3 + vIdx * 11) % 58) / 10.0;

          const look: FashionLook = {
            id: `look_${lookCode.toLowerCase()}`,
            look_code: lookCode,
            title: `${titlePrefix} ${topRaw.name.split(' ')[0]} & ${botRaw.name.split(' ')[0]} Ensemble`,
            gender,
            culture,
            occasion,
            skin_type: skin,
            body_type: body,
            hair_type: hair,
            face_shape: faceShape,
            hero_image: heroImage,
            description: `Engineered look configuration for ${skin.toUpperCase()} tone, ${body.toUpperCase()} build, and ${hair.toUpperCase()} hair profile with ${colorHarmony.scheme_name} color theory.`,
            color_harmony: colorHarmony,
            pieces: [topPiece, botPiece, footPiece, eyePiece, wristPiece],
            accessories_summary: `${eyePiece.name} + ${wristPiece.name}`,
            grooming_note: groomingNote,
            biometric_match_rate: Math.round(matchRate * 10) / 10,
            tags: [culture, gender, skin, body, faceShape, occasion.toLowerCase().replace(/\s+/g, '-')]
          };

          looks.push(look);
        }
      }
    }
  }

  return looks;
}

export const CLIENT_MATRIX_CATALOG = buildProcedural144Catalog();

export function getFacialGeometryMetrics(faceShape: string, skinTone: string): FacialMetrics {
  const shape = faceShape.toLowerCase();
  
  const eyewearMap: Record<string, string> = {
    oval: "Universal fit: Geometric Emerald Aviators, Hexagonal wireframes, and Cyber Shields.",
    square: "Round Wireframes, Oval Cat-Eye Optics, and Curved browline sunglasses to soften angular jaw lines.",
    heart: "Light metal wire aviators, rimless bottom frames, and light cat-eye silhouettes to balance forehead width.",
    diamond: "Oval oversized sunglasses, wide browline frames, and sculpted bold acetate optics."
  };

  const groomingMap: Record<string, string> = {
    oval: "Balanced proportions allow for sculpted fades, swept pompadours, or textured high buns.",
    square: "Softer round beard trim or textured layered fringe to harmonize square jaw geometry.",
    heart: "Fuller chin-length styling or side-swept locks to add volume to the lower third of the face.",
    diamond: "Medium textured crops or soft curtain fringe to widen forehead and jawline harmony."
  };

  const metalMap: Record<string, string> = {
    fair: "Platinum & Emerald Cyber Steel, Glacial White Gold, Smoked Titanium",
    olive: "Brushed 24K Gold & Natural Colombian Emerald, Warm Bronze, Antique Copper",
    deep: "Imperial 22K Gold, Rich Zambian Emerald, High-Polish Yellow Brass & Diamond"
  };

  return {
    face_shape: faceShape.charAt(0).toUpperCase() + faceShape.slice(1),
    skin_tone: skinTone.charAt(0).toUpperCase() + skinTone.slice(1),
    undertone: skinTone === "olive" ? "Warm Golden" : skinTone === "fair" ? "Cool Pink" : "Deep Rich Neutral",
    jawline_angle: (shape === "square" || shape === "diamond") ? "Sculpted 118° Defined" : "Soft Curved 126°",
    symmetry_score: shape === "oval" ? 97.6 : shape === "square" ? 96.2 : 95.8,
    eyewear_recommendation: eyewearMap[shape] || eyewearMap.oval,
    grooming_advice: groomingMap[shape] || groomingMap.oval,
    metal_harmony: metalMap[skinTone] || metalMap.olive
  };
}
