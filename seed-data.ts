import { drizzle } from 'drizzle-orm/mysql2';
import { properties } from './drizzle/schema';

const db = drizzle(process.env.DATABASE_URL!);

const sampleProperties = [
  {
    name: "Sunset View Apartments",
    address: "123 Sunset Boulevard",
    city: "Los Angeles",
    state: "CA",
    zipCode: "90028",
    propertyType: "Apartment",
    bedrooms: 2,
    bathrooms: 20, // 2.0 bathrooms (stored as integer * 10)
    squareFeet: 1200,
    rentAmount: 250000, // $2,500/month in cents
    depositAmount: 250000,
    isAvailable: true,
    availableDate: new Date('2025-11-15'),
    description: "Beautiful 2-bedroom apartment with stunning sunset views. Modern kitchen with stainless steel appliances, in-unit washer/dryer, and private balcony. Walking distance to shops and restaurants.",
    amenities: JSON.stringify(["In-unit Washer/Dryer", "Dishwasher", "Balcony", "Parking Space", "Air Conditioning", "Hardwood Floors"]),
    petsAllowed: true,
    utilitiesIncluded: JSON.stringify(["Water", "Trash"]),
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200"
    ]),
  },
  {
    name: "Downtown Loft",
    address: "456 Main Street, Unit 3B",
    city: "San Francisco",
    state: "CA",
    zipCode: "94102",
    propertyType: "Loft",
    bedrooms: 1,
    bathrooms: 10, // 1.0 bathroom
    squareFeet: 850,
    rentAmount: 320000, // $3,200/month
    depositAmount: 320000,
    isAvailable: true,
    availableDate: new Date('2025-11-01'),
    description: "Stylish urban loft in the heart of downtown. Features exposed brick walls, high ceilings, and large windows with city views. Perfect for professionals.",
    amenities: JSON.stringify(["High Ceilings", "Exposed Brick", "Gym Access", "Rooftop Deck", "Bike Storage", "Package Room"]),
    petsAllowed: false,
    utilitiesIncluded: JSON.stringify(["Heat"]),
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=1200",
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=1200"
    ]),
  },
  {
    name: "Riverside Family Home",
    address: "789 River Road",
    city: "Portland",
    state: "OR",
    zipCode: "97201",
    propertyType: "House",
    bedrooms: 4,
    bathrooms: 25, // 2.5 bathrooms
    squareFeet: 2400,
    rentAmount: 350000, // $3,500/month
    depositAmount: 350000,
    isAvailable: true,
    availableDate: new Date('2025-12-01'),
    description: "Spacious 4-bedroom family home with large backyard and river views. Updated kitchen, master suite with walk-in closet, and attached 2-car garage. Great schools nearby.",
    amenities: JSON.stringify(["Backyard", "2-Car Garage", "Fireplace", "Updated Kitchen", "Master Suite", "Laundry Room"]),
    petsAllowed: true,
    utilitiesIncluded: JSON.stringify([]),
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200"
    ]),
  },
  {
    name: "Garden View Studio",
    address: "321 Park Avenue",
    city: "Seattle",
    state: "WA",
    zipCode: "98101",
    propertyType: "Studio",
    bedrooms: 0,
    bathrooms: 10, // 1.0 bathroom
    squareFeet: 550,
    rentAmount: 165000, // $1,650/month
    depositAmount: 165000,
    isAvailable: true,
    availableDate: new Date('2025-11-10'),
    description: "Cozy studio apartment overlooking community gardens. Efficient layout with murphy bed, kitchenette, and plenty of natural light. Perfect for singles or students.",
    amenities: JSON.stringify(["Murphy Bed", "Garden View", "On-site Laundry", "Storage Unit", "Bike Parking"]),
    petsAllowed: false,
    utilitiesIncluded: JSON.stringify(["Water", "Trash", "Sewer"]),
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=1200"
    ]),
  },
  {
    name: "Luxury Penthouse",
    address: "100 Skyline Drive, PH1",
    city: "Miami",
    state: "FL",
    zipCode: "33131",
    propertyType: "Penthouse",
    bedrooms: 3,
    bathrooms: 30, // 3.0 bathrooms
    squareFeet: 3200,
    rentAmount: 750000, // $7,500/month
    depositAmount: 750000,
    isAvailable: false,
    description: "Stunning penthouse with panoramic ocean views. Floor-to-ceiling windows, gourmet kitchen, spa-like bathrooms, and private terrace. Concierge and valet services included.",
    amenities: JSON.stringify(["Ocean View", "Private Terrace", "Concierge", "Valet Parking", "Pool Access", "Fitness Center", "Wine Storage"]),
    petsAllowed: true,
    utilitiesIncluded: JSON.stringify(["Water", "Trash"]),
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200"
    ]),
  }
];

async function seed() {
  console.log('Seeding properties...');
  
  for (const property of sampleProperties) {
    await db.insert(properties).values(property);
    console.log(`✓ Added: ${property.name}`);
  }
  
  console.log('\n✅ Seeding complete! Added', sampleProperties.length, 'properties.');
  process.exit(0);
}

seed().catch((error) => {
  console.error('Error seeding database:', error);
  process.exit(1);
});
