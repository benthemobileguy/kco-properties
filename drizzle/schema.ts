import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, decimal } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Properties table - stores rental properties
 */
export const properties = mysqlTable("properties", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  address: text("address").notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  state: varchar("state", { length: 50 }).notNull(),
  zipCode: varchar("zipCode", { length: 20 }).notNull(),
  propertyType: varchar("propertyType", { length: 50 }).notNull(), // apartment, house, condo, etc.
  bedrooms: int("bedrooms").notNull(),
  bathrooms: int("bathrooms").notNull(), // stored as integer (1.5 bath = 15, divide by 10)
  squareFeet: int("squareFeet"),
  rentAmount: int("rentAmount").notNull(), // stored in cents
  depositAmount: int("depositAmount").notNull(), // stored in cents
  isAvailable: boolean("isAvailable").default(false).notNull(),
  availableDate: timestamp("availableDate"),
  description: text("description"),
  amenities: text("amenities"), // JSON string array
  petsAllowed: boolean("petsAllowed").default(false).notNull(),
  utilitiesIncluded: text("utilitiesIncluded"), // JSON string array
  images: text("images"), // JSON string array of S3 URLs
  floorPlanUrl: varchar("floorPlanUrl", { length: 500 }),
  virtualTourUrl: varchar("virtualTourUrl", { length: 500 }),
  latitude: varchar("latitude", { length: 50 }),
  longitude: varchar("longitude", { length: 50 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Property = typeof properties.$inferSelect;
export type InsertProperty = typeof properties.$inferInsert;

/**
 * Rental applications table
 */
export const applications = mysqlTable("applications", {
  id: int("id").autoincrement().primaryKey(),
  propertyId: int("propertyId").notNull(),
  userId: int("userId"), // optional - may be null for non-authenticated applicants
  status: mysqlEnum("status", ["pending", "under_review", "approved", "denied", "incomplete"]).default("pending").notNull(),
  
  // Applicant Information
  fullName: varchar("fullName", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  dateOfBirth: varchar("dateOfBirth", { length: 20 }),
  ssnLast4: varchar("ssnLast4", { length: 4 }),
  
  // Current Address
  currentAddress: text("currentAddress"),
  moveInDate: varchar("moveInDate", { length: 20 }),
  moveOutDate: varchar("moveOutDate", { length: 20 }),
  reasonForLeaving: text("reasonForLeaving"),
  previousLandlordName: varchar("previousLandlordName", { length: 255 }),
  previousLandlordPhone: varchar("previousLandlordPhone", { length: 50 }),
  
  // Employment
  employerName: varchar("employerName", { length: 255 }),
  position: varchar("position", { length: 255 }),
  monthlyIncome: int("monthlyIncome"), // stored in cents
  supervisorContact: varchar("supervisorContact", { length: 255 }),
  
  // Additional Information
  additionalOccupants: text("additionalOccupants"), // JSON string
  pets: text("pets"), // JSON string
  vehicles: text("vehicles"), // JSON string
  emergencyContactName: varchar("emergencyContactName", { length: 255 }),
  emergencyContactPhone: varchar("emergencyContactPhone", { length: 50 }),
  
  // Consent & Documents
  consentGiven: boolean("consentGiven").default(false).notNull(),
  signatureData: text("signatureData"),
  signatureDate: timestamp("signatureDate"),
  idDocumentUrl: varchar("idDocumentUrl", { length: 500 }),
  incomeProofUrl: varchar("incomeProofUrl", { length: 500 }),
  
  // Payment
  applicationFeePaid: boolean("applicationFeePaid").default(false).notNull(),
  applicationFeeAmount: int("applicationFeeAmount"), // stored in cents
  paymentTransactionId: varchar("paymentTransactionId", { length: 255 }),
  
  // Admin Notes
  adminNotes: text("adminNotes"),
  reviewedBy: int("reviewedBy"),
  reviewedAt: timestamp("reviewedAt"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Application = typeof applications.$inferSelect;
export type InsertApplication = typeof applications.$inferInsert;

/**
 * Leases table - active tenant leases
 */
export const leases = mysqlTable("leases", {
  id: int("id").autoincrement().primaryKey(),
  propertyId: int("propertyId").notNull(),
  tenantId: int("tenantId").notNull(), // references users.id
  applicationId: int("applicationId"),
  
  leaseStartDate: timestamp("leaseStartDate").notNull(),
  leaseEndDate: timestamp("leaseEndDate").notNull(),
  monthlyRent: int("monthlyRent").notNull(), // stored in cents
  securityDeposit: int("securityDeposit").notNull(), // stored in cents
  
  leaseDocumentUrl: varchar("leaseDocumentUrl", { length: 500 }),
  status: mysqlEnum("status", ["active", "expired", "terminated", "pending"]).default("pending").notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Lease = typeof leases.$inferSelect;
export type InsertLease = typeof leases.$inferInsert;

/**
 * Payments table - rent and other payments
 */
export const payments = mysqlTable("payments", {
  id: int("id").autoincrement().primaryKey(),
  leaseId: int("leaseId").notNull(),
  tenantId: int("tenantId").notNull(),
  
  amount: int("amount").notNull(), // stored in cents
  paymentType: mysqlEnum("paymentType", ["rent", "deposit", "fee", "other"]).notNull(),
  paymentMethod: varchar("paymentMethod", { length: 50 }),
  transactionId: varchar("transactionId", { length: 255 }),
  
  status: mysqlEnum("status", ["pending", "completed", "failed", "refunded"]).default("pending").notNull(),
  paymentDate: timestamp("paymentDate").notNull(),
  dueDate: timestamp("dueDate"),
  
  notes: text("notes"),
  receiptUrl: varchar("receiptUrl", { length: 500 }),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Payment = typeof payments.$inferSelect;
export type InsertPayment = typeof payments.$inferInsert;

/**
 * Maintenance requests table
 */
export const maintenanceRequests = mysqlTable("maintenanceRequests", {
  id: int("id").autoincrement().primaryKey(),
  propertyId: int("propertyId").notNull(),
  tenantId: int("tenantId").notNull(),
  
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  urgency: mysqlEnum("urgency", ["low", "medium", "high", "emergency"]).default("medium").notNull(),
  status: mysqlEnum("status", ["open", "in_progress", "completed", "cancelled"]).default("open").notNull(),
  
  images: text("images"), // JSON string array of S3 URLs
  
  assignedTo: int("assignedTo"),
  completedAt: timestamp("completedAt"),
  
  adminNotes: text("adminNotes"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type MaintenanceRequest = typeof maintenanceRequests.$inferSelect;
export type InsertMaintenanceRequest = typeof maintenanceRequests.$inferInsert;

/**
 * Messages table - communication between tenants and management
 */
export const messages = mysqlTable("messages", {
  id: int("id").autoincrement().primaryKey(),
  senderId: int("senderId").notNull(),
  recipientId: int("recipientId"),
  propertyId: int("propertyId"),
  
  subject: varchar("subject", { length: 255 }),
  content: text("content").notNull(),
  isRead: boolean("isRead").default(false).notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Message = typeof messages.$inferSelect;
export type InsertMessage = typeof messages.$inferInsert;

/**
 * Tour bookings table - property tour scheduling
 */
export const tourBookings = mysqlTable("tourBookings", {
  id: int("id").autoincrement().primaryKey(),
  propertyId: int("propertyId").notNull(),
  
  // Visitor Information
  fullName: varchar("fullName", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  
  // Tour Details
  tourDate: varchar("tourDate", { length: 20 }).notNull(),
  tourTime: varchar("tourTime", { length: 20 }).notNull(),
  numberOfPeople: int("numberOfPeople").default(1),
  message: text("message"),
  
  // Status
  status: mysqlEnum("status", ["pending", "confirmed", "completed", "cancelled", "no_show"]).default("pending").notNull(),
  reminderSent: boolean("reminderSent").default(false).notNull(),
  
  // Admin
  confirmedBy: int("confirmedBy"),
  confirmedAt: timestamp("confirmedAt"),
  adminNotes: text("adminNotes"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type TourBooking = typeof tourBookings.$inferSelect;
export type InsertTourBooking = typeof tourBookings.$inferInsert;

export const contactMessages = mysqlTable("contactMessages", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  subject: varchar("subject", { length: 500 }).notNull(),
  message: text("message").notNull(),
  status: mysqlEnum("status", ["new", "read", "responded"]).default("new").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = typeof contactMessages.$inferInsert;

/**
 * Units table - individual units within properties
 */
export const units = mysqlTable("units", {
  id: int("id").autoincrement().primaryKey(),
  propertyId: int("propertyId").notNull(),
  
  // Unit Details
  unitNumber: varchar("unitNumber", { length: 50 }).notNull(),
  floor: int("floor"),
  bedrooms: int("bedrooms").notNull(),
  bathrooms: int("bathrooms").notNull(), // stored as integer (1.5 bath = 15, divide by 10)
  squareFeet: int("squareFeet"),
  rentAmount: int("rentAmount").notNull(), // stored in cents
  depositAmount: int("depositAmount").notNull(), // stored in cents
  
  // Availability
  isAvailable: boolean("isAvailable").default(true).notNull(),
  availableDate: timestamp("availableDate"),
  currentTenantId: int("currentTenantId"),
  leaseEndDate: timestamp("leaseEndDate"),
  
  // Unit Specific Features
  amenities: text("amenities"), // JSON string array
  images: text("images"), // JSON string array of S3 URLs
  floorPlanUrl: varchar("floorPlanUrl", { length: 500 }),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Unit = typeof units.$inferSelect;
export type InsertUnit = typeof units.$inferInsert;
