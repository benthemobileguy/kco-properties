import { drizzle } from 'drizzle-orm/mysql2';
import { units } from './drizzle/schema.ts';

const db = drizzle(process.env.DATABASE_URL);

const sampleUnits = [
  // Garden View Studio - Property ID 1
  { propertyId: 1, unitNumber: '101', floor: 1, bedrooms: 0, bathrooms: 10, squareFeet: 550, rentAmount: 165000, depositAmount: 165000, isAvailable: true, availableDate: new Date() },
  { propertyId: 1, unitNumber: '102', floor: 1, bedrooms: 0, bathrooms: 10, squareFeet: 550, rentAmount: 165000, depositAmount: 165000, isAvailable: true, availableDate: new Date() },
  { propertyId: 1, unitNumber: '201', floor: 2, bedrooms: 0, bathrooms: 10, squareFeet: 550, rentAmount: 165000, depositAmount: 165000, isAvailable: false },
  { propertyId: 1, unitNumber: '202', floor: 2, bedrooms: 0, bathrooms: 10, squareFeet: 550, rentAmount: 165000, depositAmount: 165000, isAvailable: true, availableDate: new Date('2025-12-15') },
  
  // Sunset View Apartments - Property ID 2
  { propertyId: 2, unitNumber: 'A1', floor: 1, bedrooms: 1, bathrooms: 10, squareFeet: 750, rentAmount: 220000, depositAmount: 220000, isAvailable: true, availableDate: new Date() },
  { propertyId: 2, unitNumber: 'A2', floor: 1, bedrooms: 1, bathrooms: 10, squareFeet: 750, rentAmount: 220000, depositAmount: 220000, isAvailable: true, availableDate: new Date() },
  { propertyId: 2, unitNumber: 'B1', floor: 2, bedrooms: 1, bathrooms: 10, squareFeet: 800, rentAmount: 235000, depositAmount: 235000, isAvailable: true, availableDate: new Date() },
  { propertyId: 2, unitNumber: 'B2', floor: 2, bedrooms: 1, bathrooms: 10, squareFeet: 800, rentAmount: 235000, depositAmount: 235000, isAvailable: false },
  
  // Downtown Loft - Property ID 3
  { propertyId: 3, unitNumber: '301', floor: 3, bedrooms: 2, bathrooms: 20, squareFeet: 1200, rentAmount: 320000, depositAmount: 320000, isAvailable: true, availableDate: new Date() },
  { propertyId: 3, unitNumber: '302', floor: 3, bedrooms: 2, bathrooms: 20, squareFeet: 1200, rentAmount: 320000, depositAmount: 320000, isAvailable: true, availableDate: new Date('2025-12-01') },
  { propertyId: 3, unitNumber: '401', floor: 4, bedrooms: 2, bathrooms: 20, squareFeet: 1250, rentAmount: 335000, depositAmount: 335000, isAvailable: true, availableDate: new Date() },
  
  // Riverside Townhome - Property ID 4
  { propertyId: 4, unitNumber: '1A', floor: 1, bedrooms: 3, bathrooms: 25, squareFeet: 1800, rentAmount: 285000, depositAmount: 285000, isAvailable: true, availableDate: new Date() },
  { propertyId: 4, unitNumber: '1B', floor: 1, bedrooms: 3, bathrooms: 25, squareFeet: 1800, rentAmount: 285000, depositAmount: 285000, isAvailable: false },
  { propertyId: 4, unitNumber: '2A', floor: 1, bedrooms: 3, bathrooms: 25, squareFeet: 1850, rentAmount: 295000, depositAmount: 295000, isAvailable: true, availableDate: new Date('2025-12-10') },
  
  // Luxury Penthouse Suite - Property ID 5
  { propertyId: 5, unitNumber: 'PH1', floor: 10, bedrooms: 3, bathrooms: 30, squareFeet: 2500, rentAmount: 450000, depositAmount: 450000, isAvailable: true, availableDate: new Date() },
  { propertyId: 5, unitNumber: 'PH2', floor: 10, bedrooms: 3, bathrooms: 30, squareFeet: 2500, rentAmount: 450000, depositAmount: 450000, isAvailable: false },
];

async function seed() {
  console.log('Seeding units...');
  
  for (const unit of sampleUnits) {
    await db.insert(units).values(unit);
    console.log(`✓ Created unit ${unit.unitNumber} for property ${unit.propertyId}`);
  }
  
  console.log('✓ Units seeded successfully!');
  process.exit(0);
}

seed().catch((error) => {
  console.error('Error seeding units:', error);
  process.exit(1);
});
