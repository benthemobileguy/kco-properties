import { Link, useRoute, useLocation } from "wouter";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AvailabilityChecker from "@/components/AvailabilityChecker";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, Square, MapPin, DollarSign, Calendar, Home, Check, X, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

export default function PropertyDetail() {
  const [, params] = useRoute("/properties/:id");
  const [, setLocation] = useLocation();
  const propertyId = params?.id ? parseInt(params.id) : 0;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const { data: property, isLoading } = trpc.properties.getById.useQuery(
    { id: propertyId },
    { enabled: propertyId > 0 }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading property details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground text-lg mb-4">Property not found</p>
            <Link href="/properties">
              <Button>Back to Properties</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Parse images from JSON string
  const images = property.images ? JSON.parse(property.images) : [];
  const displayImages = images.length > 0 ? images : ['https://placehold.co/1200x800/E1E7EF/1F2937?text=Property'];
  
  // Parse amenities
  const amenities = property.amenities ? JSON.parse(property.amenities) : [];
  
  // Parse utilities
  const utilities = property.utilitiesIncluded ? JSON.parse(property.utilitiesIncluded) : [];
  
  // Format rent amount (stored in cents)
  const rentAmount = (property.rentAmount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });
  
  const depositAmount = (property.depositAmount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });

  // Format bathrooms (stored as integer, divide by 10)
  const bathrooms = property.bathrooms / 10;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  const handleScheduleTour = () => {
    setLocation(`/properties/${property.id}/schedule-tour`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Image Gallery */}
        <section className="bg-black">
          <div className="container py-8">
            <div className="relative aspect-[16/9] max-h-[600px] overflow-hidden rounded-lg">
              <img
                src={displayImages[currentImageIndex]}
                alt={`${property.name} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              
              {displayImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                  
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {displayImages.map((_: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex ? 'bg-white w-8' : 'bg-white/50'
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Property Details */}
        <section className="py-12">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl md:text-4xl font-bold mb-2">{property.name}</h1>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-5 w-5" />
                        <span className="text-lg">
                          {property.address}, {property.city}, {property.state} {property.zipCode}
                        </span>
                      </div>
                    </div>
                    {property.isAvailable && (
                      <Badge className="bg-green-500 text-white text-lg px-4 py-2">
                        Available
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-6 text-lg">
                    <div className="flex items-center gap-2">
                      <Bed className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">{property.bedrooms}</span>
                      <span className="text-muted-foreground">Bedrooms</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bath className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">{bathrooms}</span>
                      <span className="text-muted-foreground">Bathrooms</span>
                    </div>
                    {property.squareFeet && (
                      <div className="flex items-center gap-2">
                        <Square className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">{property.squareFeet.toLocaleString()}</span>
                        <span className="text-muted-foreground">sqft</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Home className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">{property.propertyType}</span>
                    </div>
                  </div>
                </div>

                {/* Availability Checker */}
                <AvailabilityChecker propertyId={property.id} />

                {/* Description */}
                {property.description && (
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-semibold mb-4">Description</h2>
                      <p className="text-muted-foreground leading-relaxed">{property.description}</p>
                    </CardContent>
                  </Card>
                )}

                {/* Amenities */}
                {amenities.length > 0 && (
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
                      <div className="grid md:grid-cols-2 gap-3">
                        {amenities.map((amenity: string, index: number) => (
                          <div key={index} className="flex items-center gap-2">
                            <Check className="h-5 w-5 text-secondary" />
                            <span>{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Virtual Tour */}
                {property.virtualTourUrl && (
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-semibold mb-4">Virtual Tour</h2>
                      <div className="aspect-video rounded-lg overflow-hidden">
                        <iframe
                          src={property.virtualTourUrl}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title="Virtual Tour"
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Additional Details */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold mb-4">Property Details</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-muted-foreground">Property Type</span>
                        <span className="font-medium">{property.propertyType}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-muted-foreground">Pets Allowed</span>
                        <span className="font-medium flex items-center gap-1">
                          {property.petsAllowed ? (
                            <>
                              <Check className="h-4 w-4 text-green-500" />
                              Yes
                            </>
                          ) : (
                            <>
                              <X className="h-4 w-4 text-red-500" />
                              No
                            </>
                          )}
                        </span>
                      </div>
                      {utilities.length > 0 && (
                        <div className="flex justify-between py-2 border-b md:col-span-2">
                          <span className="text-muted-foreground">Utilities Included</span>
                          <span className="font-medium">{utilities.join(', ')}</span>
                        </div>
                      )}
                      {property.availableDate && (
                        <div className="flex justify-between py-2 border-b md:col-span-2">
                          <span className="text-muted-foreground">Available Date</span>
                          <span className="font-medium">
                            {new Date(property.availableDate).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card className="sticky top-24">
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <div className="flex items-baseline gap-2 mb-1">
                        <DollarSign className="h-6 w-6 text-primary" />
                        <span className="text-4xl font-bold text-primary">{rentAmount}</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Security Deposit: {depositAmount}
                      </p>
                    </div>

                    {property.isAvailable ? (
                      <div className="space-y-3">
                        <Link href={`/apply?propertyId=${property.id}`}>
                          <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90" size="lg">
                            Apply Now
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          className="w-full"
                          size="lg"
                          onClick={handleScheduleTour}
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule Tour
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <Badge variant="secondary" className="text-lg px-4 py-2">
                          Not Currently Available
                        </Badge>
                      </div>
                    )}

                    <div className="pt-6 border-t">
                      <h3 className="font-semibold mb-3">Questions?</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Contact us for more information about this property.
                      </p>
                      <Link href="/contact">
                        <Button variant="outline" className="w-full">
                          Contact Us
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
