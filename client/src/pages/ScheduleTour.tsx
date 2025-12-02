import { useState } from "react";
import { useParams, useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Calendar, Clock, User, Mail, Phone, Users, MessageSquare, CheckCircle, Bed, Bath, Square, DollarSign, Building2 } from "lucide-react";

export default function ScheduleTour() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const propertyId = params.id ? parseInt(params.id) : undefined;

  const [submitted, setSubmitted] = useState(false);
  const [selectedUnitId, setSelectedUnitId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    tourDate: "",
    tourTime: "",
    numberOfPeople: 1,
    message: "",
  });

  const { data: property, isLoading: propertyLoading } = trpc.properties.getById.useQuery(
    { id: propertyId! },
    { enabled: !!propertyId }
  );

  const { data: units, isLoading: unitsLoading } = trpc.units.list.useQuery(
    { propertyId: propertyId! },
    { enabled: !!propertyId }
  );

  const availableUnits = units?.filter(unit => unit.isAvailable) || [];
  const selectedUnit = availableUnits.find(unit => unit.id === selectedUnitId);

  const createTourMutation = trpc.tours.create.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Tour request submitted successfully!");
    },
    onError: (error) => {
      toast.error("Failed to submit tour request: " + error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!propertyId) {
      toast.error("Property not found");
      return;
    }

    if (!formData.fullName || !formData.email || !formData.phone || !formData.tourDate || !formData.tourTime) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Include unit information in the message if a unit is selected
    let finalMessage = formData.message;
    if (selectedUnit) {
      finalMessage = `Interested in Unit ${selectedUnit.unitNumber}${selectedUnit.floor ? ` (Floor ${selectedUnit.floor})` : ''}. ${formData.message}`;
    }

    createTourMutation.mutate({
      propertyId,
      ...formData,
      message: finalMessage,
    });
  };

  if (propertyLoading || unitsLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-12">
          <div className="container">
            <p>Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-12">
          <div className="container">
            <p>Property not found</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-12">
          <div className="container max-w-2xl">
            <Card className="text-center">
              <CardContent className="pt-12 pb-12">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Tour Request Submitted!</h2>
                <p className="text-muted-foreground mb-6">
                  Thank you for your interest in {property.name}. We'll contact you shortly to confirm your tour.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button onClick={() => setLocation("/properties")}>
                    Browse More Properties
                  </Button>
                  <Button variant="outline" onClick={() => setLocation("/")}>
                    Back to Home
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12 bg-gray-50">
        <div className="container max-w-6xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Schedule a Tour</h1>
            <p className="text-muted-foreground">
              Book a tour of {property.name} and see your future home
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Property Info */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Property Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {property.images && property.images.length > 0 && (
                    <img 
                      src={property.images[0]} 
                      alt={property.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  )}
                  <div>
                    <h3 className="font-bold text-lg">{property.name}</h3>
                    <p className="text-sm text-muted-foreground">{property.address}</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Bed className="h-4 w-4 text-muted-foreground" />
                      <span>{property.bedrooms} Bed</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="h-4 w-4 text-muted-foreground" />
                      <span>{property.bathrooms / 10} Bath</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Available Units */}
              {availableUnits.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      Available Units
                    </CardTitle>
                    <CardDescription>
                      {availableUnits.length} unit{availableUnits.length !== 1 ? 's' : ''} available
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {availableUnits.map((unit) => {
                      const rentAmount = (unit.rentAmount / 100).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 0,
                      });
                      const bathrooms = unit.bathrooms / 10;
                      const isSelected = selectedUnitId === unit.id;

                      return (
                        <div
                          key={unit.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            isSelected ? 'border-primary bg-primary/5 shadow-md' : 'hover:border-primary/50 hover:bg-gray-50'
                          }`}
                          onClick={() => setSelectedUnitId(isSelected ? null : unit.id)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold">Unit {unit.unitNumber}</h4>
                              {unit.floor !== null && (
                                <p className="text-xs text-muted-foreground">Floor {unit.floor}</p>
                              )}
                            </div>
                            {isSelected && (
                              <Badge className="bg-primary">Selected</Badge>
                            )}
                          </div>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-3 w-3 text-muted-foreground" />
                              <span className="font-medium">{rentAmount}/mo</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1">
                                <Bed className="h-3 w-3 text-muted-foreground" />
                                <span>{unit.bedrooms}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Bath className="h-3 w-3 text-muted-foreground" />
                                <span>{bathrooms}</span>
                              </div>
                              {unit.squareFeet && (
                                <div className="flex items-center gap-1">
                                  <Square className="h-3 w-3 text-muted-foreground" />
                                  <span>{unit.squareFeet} sqft</span>
                                </div>
                              )}
                            </div>
                            {unit.availableDate && (
                              <p className="text-xs text-muted-foreground">
                                Available: {new Date(unit.availableDate).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Tour Booking Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Tour Information</CardTitle>
                  <CardDescription>
                    Fill out the form below to schedule your tour
                    {selectedUnit && ` for Unit ${selectedUnit.unitNumber}`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Your Information
                      </h3>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Full Name *</Label>
                          <Input
                            id="fullName"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            placeholder="John Doe"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="john@example.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="(123) 456-7890"
                          required
                        />
                      </div>
                    </div>

                    {/* Tour Details */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Tour Details
                      </h3>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="tourDate">Preferred Date *</Label>
                          <Input
                            id="tourDate"
                            type="date"
                            value={formData.tourDate}
                            onChange={(e) => setFormData({ ...formData, tourDate: e.target.value })}
                            min={new Date().toISOString().split('T')[0]}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="tourTime">Preferred Time *</Label>
                          <Input
                            id="tourTime"
                            type="time"
                            value={formData.tourTime}
                            onChange={(e) => setFormData({ ...formData, tourTime: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="numberOfPeople">Number of People</Label>
                        <Select
                          value={formData.numberOfPeople.toString()}
                          onValueChange={(value) => setFormData({ ...formData, numberOfPeople: parseInt(value) })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num} {num === 1 ? 'person' : 'people'}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Additional Message (Optional)</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Any specific questions or requirements?"
                          rows={4}
                        />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button 
                        type="submit" 
                        className="flex-1"
                        disabled={createTourMutation.isPending}
                      >
                        {createTourMutation.isPending ? "Submitting..." : "Schedule Tour"}
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setLocation(`/properties/${propertyId}`)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
