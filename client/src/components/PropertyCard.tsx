import { Link } from "wouter";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bed, Bath, Square, MapPin, DollarSign } from "lucide-react";
import type { Property } from "../../../drizzle/schema";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  // Parse images from JSON string
  const images = property.images ? JSON.parse(property.images) : [];
  const mainImage = images[0] || 'https://placehold.co/600x400/E1E7EF/1F2937?text=Property';
  
  // Format rent amount (stored in cents)
  const rentAmount = (property.rentAmount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });

  // Format bathrooms (stored as integer, divide by 10)
  const bathrooms = property.bathrooms / 10;

  return (
    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group border-2 hover:border-sky-blue/30">
      <Link href={`/properties/${property.id}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={mainImage}
            alt={property.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {property.isAvailable && (
            <Badge className="absolute top-3 right-3 bg-green-500 text-white">
              Available
            </Badge>
          )}
        </div>
      </Link>
      
      <CardContent className="p-4">
        <Link href={`/properties/${property.id}`}>
          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-sky-blue transition-colors">
            {property.name}
          </h3>
        </Link>
        
        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
          <MapPin className="h-4 w-4" />
          <span>{property.city}, {property.state}</span>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1 text-primary font-bold text-2xl">
            <DollarSign className="h-5 w-5" />
            <span>{rentAmount}</span>
          </div>
          <span className="text-muted-foreground text-sm">/month</span>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            <span>{property.bedrooms} Bed</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            <span>{bathrooms} Bath</span>
          </div>
          {property.squareFeet && (
            <div className="flex items-center gap-1">
              <Square className="h-4 w-4" />
              <span>{property.squareFeet.toLocaleString()} sqft</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="text-xs">
            {property.propertyType}
          </Badge>
          {property.petsAllowed && (
            <Badge variant="outline" className="text-xs">
              Pet Friendly
            </Badge>
          )}
        </div>
        
        {property.description && (
          <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
            {property.description}
          </p>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Link href={`/properties/${property.id}`} className="flex-1">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
        {property.isAvailable && (
          <Link href={`/apply?propertyId=${property.id}`} className="flex-1">
            <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
              Apply Now
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
