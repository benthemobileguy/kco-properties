# KCO Properties Website User Guide

## Purpose

Your website helps prospective tenants browse rental properties, view detailed information with photo galleries, submit online applications, schedule property tours, and contact your team.

## Access

Public website accessible to all visitors. Admin dashboard requires login with admin role.

---

## Powered by Manus

**Technology Stack:**
- **Frontend**: React 19 with TypeScript, Tailwind CSS 4, shadcn/ui component library
- **Backend**: Express 4 with tRPC 11 for type-safe API communication
- **Database**: MySQL with Drizzle ORM for reliable data management
- **Authentication**: Manus OAuth integration for secure user management
- **SEO**: React Helmet for meta tags and structured data optimization
- **Deployment**: Auto-scaling infrastructure with global CDN for fast worldwide access

This modern stack ensures your website loads quickly, handles high traffic seamlessly, and provides excellent user experience across all devices with optimized search engine visibility.

---

## Using Your Website

### Browsing Properties

Visitors explore your rental portfolio through the "Properties" or "Vacancies" pages. Each property card shows rent amount, bedrooms, bathrooms, and location. The homepage search widget filters by location, price range, bedrooms, and bathrooms.

### Viewing Property Details

Click any property card to see full details. The page displays a photo gallery with navigation arrows, complete description, amenities list, and key details like square footage and pet policy. Available properties show "Apply Now" and "Schedule Tour" buttons. Properties with virtual tours display embedded 360-degree viewers or video walkthroughs.

### Submitting Applications

Click "Apply Now" from any property page or homepage. The six-step form guides applicants through personal information, residence history with landlord references, employment and income details, emergency contacts and household information, document uploads for photo ID and income proof, and a final review with consent agreement. You receive instant email notifications when applications arrive.

### Scheduling Property Tours

Visitors click "Schedule Tour" on any property detail page to request viewings. The form collects contact information, preferred date and time, number of people, and optional messages. You receive instant email notifications with tour details. Manage requests in the Database panel under "tourBookings" or the Admin Dashboard.

### Contacting You

The Contact page includes a functional form that saves messages to your database and sends email notifications. Visitors fill in name, email, phone, subject, and message, then click "Send Message". View all contact form submissions in the Database panel under "contactMessages".

---

## Managing Your Website

### Admin Dashboard

Click "Admin" in the navigation (admin users only) to access your centralized management dashboard. View statistics for total properties, available units, pending applications, and pending tours. Three tabs organize your work: Properties shows all listings with quick access to details, Applications displays rental applications with "Approve" and "Deny" buttons for pending submissions, and Tour Requests shows scheduled viewings with "Confirm" and "Cancel" options.

### Viewing Applications and Tours

The Admin Dashboard provides one-click approval or denial of applications. Each application shows applicant contact information, employment details, and monthly income. Tour requests display preferred date and time, number of people, and contact information. Email notifications arrive instantly when new applications or tour requests are submitted.

### Managing Properties

Access the Database panel to edit property details, rent amounts, descriptions, amenities, and photos. Add virtual tour URLs to embed 360-degree tours or video walkthroughs on property detail pages. Change "isAvailable" to control visibility in the Vacancies section.

### Website Settings

Click "Settings" in the Management UI to access configuration options. Under "General" update website name and logo. The "Domains" section lets you customize your manus.space subdomain or connect a custom domain. View and manage environment variables in the "Secrets" panel.

### Publishing Changes

After making updates, Manus creates a checkpoint. Click "Publish" in the Management UI header to deploy changes live. The Dashboard panel shows published site status and visitor analytics.

---

## Next Steps

Talk to Manus AI anytime to request changes or add features. Your website includes property listings, applications, tour scheduling, contact forms, admin dashboard, SEO optimization, and virtual tour support. Consider adding Stripe payment processing for application fees or a tenant portal for rent payments and maintenance requests. Start promoting your properties and manage everything through your professional dashboard.
