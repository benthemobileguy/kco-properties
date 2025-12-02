import { drizzle } from "drizzle-orm/mysql2";
import { properties } from "./drizzle/schema.ts";

const db = drizzle(process.env.DATABASE_URL);

const sampleProperties = [
  {
    name: "Modern Downtown Apartment",
    address: "456 Main Street, Unit 301",
    city: "Springfield",
    state: "IL",
    zipCode: "62701",
    propertyType: "Apartment",
    bedrooms: 2,
    bathrooms: 20, // 2.0 baths (stored as integer * 10)
    squareFeet: 1200,
    rentAmount: 145000, // $1,450 (stored in cents)
    depositAmount: 145000,
    isAvailable: true,
    availableDate: new Date("2025-02-01"),
    description: "Beautiful modern apartment in the heart of downtown. Features open floor plan, updated kitchen with stainless steel appliances, in-unit washer/dryer, and stunning city views. Walking distance to restaurants, shops, and public transit.",
    amenities: JSON.stringify([
      "In-unit Washer/Dryer",
      "Stainless Steel Appliances",
      "Hardwood Floors",
      "Central Air Conditioning",
      "Dishwasher",
      "Balcony",
      "Parking Space Included"
    ]),
    petsAllowed: true,
    utilitiesIncluded: JSON.stringify(["Water", "Trash"]),
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
      "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=1200"
    ]),
  },
  {
    name: "Spacious Family Home",
    address: "789 Oak Avenue",
    city: "Springfield",
    state: "IL",
    zipCode: "62704",
    propertyType: "House",
    bedrooms: 4,
    bathrooms: 25, // 2.5 baths
    squareFeet: 2400,
    rentAmount: 225000, // $2,250
    depositAmount: 225000,
    isAvailable: true,
    availableDate: new Date("2025-03-01"),
    description: "Charming single-family home in quiet neighborhood. Large fenced backyard perfect for families. Updated kitchen and bathrooms, spacious living areas, and attached two-car garage. Close to top-rated schools and parks.",
    amenities: JSON.stringify([
      "Fenced Backyard",
      "2-Car Garage",
      "Updated Kitchen",
      "Central Heat & Air",
      "Washer/Dryer Hookups",
      "Hardwood Floors",
      "Walk-in Closets"
    ]),
    petsAllowed: true,
    utilitiesIncluded: JSON.stringify([]),
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200"
    ]),
  },
  {
    name: "Cozy Studio Apartment",
    address: "123 Elm Street, Apt 2B",
    city: "Springfield",
    state: "IL",
    zipCode: "62702",
    propertyType: "Studio",
    bedrooms: 1,
    bathrooms: 10, // 1.0 bath
    squareFeet: 550,
    rentAmount: 85000, // $850
    depositAmount: 85000,
    isAvailable: true,
    availableDate: new Date("2025-01-15"),
    description: "Efficient studio apartment perfect for young professionals or students. Recently renovated with modern finishes. Includes all utilities and high-speed internet. Quiet building with on-site laundry.",
    amenities: JSON.stringify([
      "All Utilities Included",
      "High-Speed Internet",
      "On-site Laundry",
      "Updated Kitchen",
      "Hardwood Floors",
      "Secure Entry"
    ]),
    petsAllowed: false,
    utilitiesIncluded: JSON.stringify(["Water", "Electric", "Gas", "Internet"]),
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1200",
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=1200"
    ]),
  },
  {
    name: "Luxury Townhouse",
    address: "321 Maple Drive",
    city: "Springfield",
    state: "IL",
    zipCode: "62703",
    propertyType: "Townhouse",
    bedrooms: 3,
    bathrooms: 25, // 2.5 baths
    squareFeet: 1800,
    rentAmount: 195000, // $1,950
    depositAmount: 195000,
    isAvailable: true,
    availableDate: new Date("2025-02-15"),
    description: "Upscale townhouse in gated community. Features granite countertops, stainless appliances, master suite with walk-in closet, and private patio. Community amenities include pool, fitness center, and clubhouse.",
    amenities: JSON.stringify([
      "Granite Countertops",
      "Stainless Appliances",
      "Master Suite",
      "Private Patio",
      "Community Pool",
      "Fitness Center",
      "Gated Community",
      "Attached Garage"
    ]),
    petsAllowed: true,
    utilitiesIncluded: JSON.stringify(["Trash", "HOA"]),
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200"
    ]),
  },
  {
    name: "Charming Bungalow",
    address: "555 Pine Street",
    city: "Springfield",
    state: "IL",
    zipCode: "62705",
    propertyType: "House",
    bedrooms: 2,
    bathrooms: 10, // 1.0 bath
    squareFeet: 950,
    rentAmount: 125000, // $1,250
    depositAmount: 125000,
    isAvailable: false,
    description: "Cute bungalow with original hardwood floors and vintage charm. Updated kitchen and bathroom. Large front porch and private backyard. Perfect for couples or small families.",
    amenities: JSON.stringify([
      "Hardwood Floors",
      "Updated Kitchen",
      "Front Porch",
      "Backyard",
      "Off-street Parking",
      "Basement Storage"
    ]),
    petsAllowed: true,
    utilitiesIncluded: JSON.stringify([]),
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200"
    ]),
  }
];

async function seed() {
  console.log("Seeding properties...");
  
  for (const property of sampleProperties) {
    await db.insert(properties).values(property);
    console.log(`Added: ${property.name}`);
  }
  
  console.log("Seeding complete!");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});
