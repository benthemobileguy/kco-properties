import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UnitsManagement from "@/components/UnitsManagement";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { 
  Home, 
  FileText, 
  Calendar, 
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Mail,
  Phone,
  MapPin,
  DollarSign
} from "lucide-react";

export default function AdminDashboard() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("properties");

  // Redirect if not admin
  if (!authLoading && (!isAuthenticated || user?.role !== 'admin')) {
    setLocation("/");
    return null;
  }

  const { data: properties, isLoading: propertiesLoading } = trpc.properties.list.useQuery();
  const { data: applications, isLoading: applicationsLoading } = trpc.applications.list.useQuery();
  const { data: tours, isLoading: toursLoading } = trpc.tours.list.useQuery();

  const updateApplicationStatus = trpc.applications.updateStatus.useMutation({
    onSuccess: () => {
      toast.success("Application status updated");
      trpc.useUtils().applications.list.invalidate();
    },
    onError: (error) => {
      toast.error("Failed to update status: " + error.message);
    },
  });

  const updateTourStatus = trpc.tours.updateStatus.useMutation({
    onSuccess: () => {
      toast.success("Tour status updated");
      trpc.useUtils().tours.list.invalidate();
    },
    onError: (error) => {
      toast.error("Failed to update status: " + error.message);
    },
  });

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const pendingApplications = applications?.filter(app => app.status === 'pending').length || 0;
  const pendingTours = tours?.filter(tour => tour.status === 'pending').length || 0;
  const availableProperties = properties?.filter(prop => prop.isAvailable).length || 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage properties, applications, and tour requests
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Properties</p>
                    <p className="text-3xl font-bold">{properties?.length || 0}</p>
                  </div>
                  <Home className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Available</p>
                    <p className="text-3xl font-bold">{availableProperties}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending Applications</p>
                    <p className="text-3xl font-bold">{pendingApplications}</p>
                  </div>
                  <FileText className="h-8 w-8 text-secondary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending Tours</p>
                    <p className="text-3xl font-bold">{pendingTours}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="units">Units</TabsTrigger>
              <TabsTrigger value="applications">
                Applications
                {pendingApplications > 0 && (
                  <Badge variant="destructive" className="ml-2">{pendingApplications}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="tours">
                Tour Requests
                {pendingTours > 0 && (
                  <Badge variant="destructive" className="ml-2">{pendingTours}</Badge>
                )}
              </TabsTrigger>
            </TabsList>

            {/* Properties Tab */}
            <TabsContent value="properties">
              <Card>
                <CardHeader>
                  <CardTitle>Property Management</CardTitle>
                  <CardDescription>
                    View and manage all rental properties
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {propertiesLoading ? (
                    <p>Loading properties...</p>
                  ) : properties && properties.length > 0 ? (
                    <div className="space-y-4">
                      {properties.map((property) => (
                        <div
                          key={property.id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-lg">{property.name}</h3>
                              <Badge variant={property.isAvailable ? "default" : "secondary"}>
                                {property.isAvailable ? "Available" : "Occupied"}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {property.city}, {property.state}
                              </span>
                              <span className="flex items-center gap-1">
                                <DollarSign className="h-4 w-4" />
                                ${(property.rentAmount / 100).toLocaleString()}/mo
                              </span>
                              <span>{property.bedrooms} bed • {property.bathrooms / 10} bath</span>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            onClick={() => setLocation(`/properties/${property.id}`)}
                          >
                            View Details
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-8">
                      No properties found
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Units Tab */}
            <TabsContent value="units">
              <UnitsManagement />
            </TabsContent>

            {/* Applications Tab */}
            <TabsContent value="applications">
              <Card>
                <CardHeader>
                  <CardTitle>Rental Applications</CardTitle>
                  <CardDescription>
                    Review and manage rental applications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {applicationsLoading ? (
                    <p>Loading applications...</p>
                  ) : applications && applications.length > 0 ? (
                    <div className="space-y-4">
                      {applications.map((app) => {
                        const property = properties?.find(p => p.id === app.propertyId);
                        return (
                          <div
                            key={app.id}
                            className="p-4 border rounded-lg space-y-3"
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-semibold text-lg">{app.fullName}</h3>
                                <p className="text-sm text-muted-foreground">
                                  Applied for: {property?.name || `Property #${app.propertyId}`}
                                </p>
                              </div>
                              <Badge
                                variant={
                                  app.status === 'approved' ? 'default' :
                                  app.status === 'denied' ? 'destructive' :
                                  'secondary'
                                }
                              >
                                {app.status}
                              </Badge>
                            </div>

                            <div className="grid md:grid-cols-2 gap-2 text-sm">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Mail className="h-4 w-4" />
                                {app.email}
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Phone className="h-4 w-4" />
                                {app.phone}
                              </div>
                              {app.employerName && (
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Users className="h-4 w-4" />
                                  {app.employerName}
                                </div>
                              )}
                              {app.monthlyIncome && (
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <DollarSign className="h-4 w-4" />
                                  ${(app.monthlyIncome / 100).toLocaleString()}/mo income
                                </div>
                              )}
                            </div>

                            {app.status === 'pending' && (
                              <div className="flex gap-2 pt-2">
                                <Button
                                  size="sm"
                                  onClick={() => updateApplicationStatus.mutate({
                                    id: app.id,
                                    status: 'approved'
                                  })}
                                  disabled={updateApplicationStatus.isPending}
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => updateApplicationStatus.mutate({
                                    id: app.id,
                                    status: 'denied'
                                  })}
                                  disabled={updateApplicationStatus.isPending}
                                >
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Deny
                                </Button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-8">
                      No applications found
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tours Tab */}
            <TabsContent value="tours">
              <Card>
                <CardHeader>
                  <CardTitle>Tour Requests</CardTitle>
                  <CardDescription>
                    Manage property tour bookings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {toursLoading ? (
                    <p>Loading tours...</p>
                  ) : tours && tours.length > 0 ? (
                    <div className="space-y-4">
                      {tours.map((tour) => {
                        const property = properties?.find(p => p.id === tour.propertyId);
                        return (
                          <div
                            key={tour.id}
                            className="p-4 border rounded-lg space-y-3"
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-semibold text-lg">{tour.fullName}</h3>
                                <p className="text-sm text-muted-foreground">
                                  Tour for: {property?.name || `Property #${tour.propertyId}`}
                                </p>
                              </div>
                              <Badge
                                variant={
                                  tour.status === 'confirmed' ? 'default' :
                                  tour.status === 'cancelled' || tour.status === 'no_show' ? 'destructive' :
                                  'secondary'
                                }
                              >
                                {tour.status}
                              </Badge>
                            </div>

                            <div className="grid md:grid-cols-2 gap-2 text-sm">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                {tour.tourDate} at {tour.tourTime}
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Users className="h-4 w-4" />
                                {tour.numberOfPeople || 1} {tour.numberOfPeople === 1 ? 'person' : 'people'}
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Mail className="h-4 w-4" />
                                {tour.email}
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Phone className="h-4 w-4" />
                                {tour.phone}
                              </div>
                            </div>

                            {tour.message && (
                              <div className="text-sm">
                                <p className="font-medium mb-1">Message:</p>
                                <p className="text-muted-foreground">{tour.message}</p>
                              </div>
                            )}

                            {tour.status === 'pending' && (
                              <div className="flex gap-2 pt-2">
                                <Button
                                  size="sm"
                                  onClick={() => updateTourStatus.mutate({
                                    id: tour.id,
                                    status: 'confirmed'
                                  })}
                                  disabled={updateTourStatus.isPending}
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Confirm
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => updateTourStatus.mutate({
                                    id: tour.id,
                                    status: 'cancelled'
                                  })}
                                  disabled={updateTourStatus.isPending}
                                >
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Cancel
                                </Button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-8">
                      No tour requests found
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
