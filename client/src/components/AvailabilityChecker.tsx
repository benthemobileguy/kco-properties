import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { Bed, Bath, Square, Calendar, DollarSign, CheckCircle2, Building2 } from "lucide-react";
import { format } from "date-fns";

interface AvailabilityCheckerProps {
  propertyId: number;
}

export default function AvailabilityChecker({ propertyId }: AvailabilityCheckerProps) {
  const { data: availableUnits, isLoading } = trpc.units.available.useQuery({ propertyId });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-sky-blue" />
            Available Units
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!availableUnits || availableUnits.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-sky-blue" />
            Available Units
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground mb-4">No units currently available at this property.</p>
            <p className="text-sm text-muted-foreground">Check back soon or contact us for upcoming availability.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-sky-blue" />
          Available Units
          <Badge variant="secondary" className="ml-auto">
            {availableUnits.length} {availableUnits.length === 1 ? 'Unit' : 'Units'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {availableUnits.map((unit) => {
          const rentAmount = (unit.rentAmount / 100).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
          });
          const bathrooms = unit.bathrooms / 10;
          const availableDate = unit.availableDate ? new Date(unit.availableDate) : null;
          const isAvailableNow = !availableDate || availableDate <= new Date();

          return (
            <Card key={unit.id} className="border-2 hover:border-sky-blue/50 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-lg text-primary">Unit {unit.unitNumber}</h4>
                    {unit.floor !== null && (
                      <p className="text-sm text-muted-foreground">Floor {unit.floor}</p>
                    )}
                  </div>
                  {isAvailableNow ? (
                    <Badge className="bg-green-500 text-white">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Available Now
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="border-sky-blue text-sky-blue">
                      <Calendar className="h-3 w-3 mr-1" />
                      {availableDate && format(availableDate, 'MMM d')}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1 text-primary font-bold text-xl">
                    <DollarSign className="h-4 w-4" />
                    <span>{rentAmount}</span>
                  </div>
                  <span className="text-muted-foreground text-sm">/month</span>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Bed className="h-4 w-4" />
                    <span>{unit.bedrooms} Bed</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="h-4 w-4" />
                    <span>{bathrooms} Bath</span>
                  </div>
                  {unit.squareFeet && (
                    <div className="flex items-center gap-1">
                      <Square className="h-4 w-4" />
                      <span>{unit.squareFeet.toLocaleString()} sqft</span>
                    </div>
                  )}
                </div>

                {!isAvailableNow && availableDate && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 bg-muted/50 p-2 rounded">
                    <Calendar className="h-4 w-4" />
                    <span>Available from {format(availableDate, 'MMMM d, yyyy')}</span>
                  </div>
                )}

                <div className="flex gap-2">
                  <Link href={`/apply?propertyId=${propertyId}&unitId=${unit.id}`} className="flex-1">
                    <Button className="w-full bg-sky-blue hover:bg-sky-blue/90 text-white">
                      Apply for This Unit
                    </Button>
                  </Link>
                  <Link href={`/properties/${propertyId}/schedule-tour`}>
                    <Button variant="outline" size="icon">
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </CardContent>
    </Card>
  );
}
