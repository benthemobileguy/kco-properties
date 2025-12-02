import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { 
  Building2, 
  Plus, 
  Pencil, 
  Trash2, 
  Bed, 
  Bath, 
  Square,
  DollarSign,
  CheckCircle2,
  XCircle
} from "lucide-react";

export default function UnitsManagement() {
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingUnit, setEditingUnit] = useState<any>(null);

  const { data: properties } = trpc.properties.list.useQuery();
  const { data: units, isLoading: unitsLoading } = trpc.units.list.useQuery(
    { propertyId: selectedProperty! },
    { enabled: selectedProperty !== null }
  );

  const createUnit = trpc.units.create.useMutation({
    onSuccess: () => {
      toast.success("Unit created successfully");
      setIsCreateDialogOpen(false);
      trpc.useUtils().units.list.invalidate();
    },
    onError: (error) => {
      toast.error("Failed to create unit: " + error.message);
    },
  });

  const updateUnit = trpc.units.update.useMutation({
    onSuccess: () => {
      toast.success("Unit updated successfully");
      setIsEditDialogOpen(false);
      setEditingUnit(null);
      trpc.useUtils().units.list.invalidate();
    },
    onError: (error) => {
      toast.error("Failed to update unit: " + error.message);
    },
  });

  const deleteUnit = trpc.units.delete.useMutation({
    onSuccess: () => {
      toast.success("Unit deleted successfully");
      trpc.useUtils().units.list.invalidate();
    },
    onError: (error) => {
      toast.error("Failed to delete unit: " + error.message);
    },
  });

  const handleCreateUnit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    createUnit.mutate({
      propertyId: selectedProperty!,
      unitNumber: formData.get("unitNumber") as string,
      floor: parseInt(formData.get("floor") as string) || undefined,
      bedrooms: parseInt(formData.get("bedrooms") as string),
      bathrooms: parseInt(formData.get("bathrooms") as string) * 10, // Store as integer (1.5 = 15)
      squareFeet: parseInt(formData.get("squareFeet") as string) || undefined,
      rentAmount: Math.round(parseFloat(formData.get("rentAmount") as string) * 100), // Store in cents
      depositAmount: Math.round(parseFloat(formData.get("depositAmount") as string) * 100),
      isAvailable: formData.get("isAvailable") === "on",
      availableDate: formData.get("availableDate") ? new Date(formData.get("availableDate") as string) : undefined,
    });
  };

  const handleUpdateUnit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    updateUnit.mutate({
      id: editingUnit.id,
      unitNumber: formData.get("unitNumber") as string,
      floor: parseInt(formData.get("floor") as string) || undefined,
      bedrooms: parseInt(formData.get("bedrooms") as string),
      bathrooms: parseInt(formData.get("bathrooms") as string) * 10,
      squareFeet: parseInt(formData.get("squareFeet") as string) || undefined,
      rentAmount: Math.round(parseFloat(formData.get("rentAmount") as string) * 100),
      depositAmount: Math.round(parseFloat(formData.get("depositAmount") as string) * 100),
      isAvailable: formData.get("isAvailable") === "on",
      availableDate: formData.get("availableDate") ? new Date(formData.get("availableDate") as string) : undefined,
    });
  };

  const handleDeleteUnit = (unitId: number, unitNumber: string) => {
    if (confirm(`Are you sure you want to delete Unit ${unitNumber}? This action cannot be undone.`)) {
      deleteUnit.mutate({ id: unitId });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Units Management
          </CardTitle>
          <CardDescription>
            Create, edit, and manage individual units within your properties
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Label htmlFor="property-select" className="min-w-[100px]">Select Property:</Label>
              <Select 
                value={selectedProperty?.toString()} 
                onValueChange={(value) => setSelectedProperty(parseInt(value))}
              >
                <SelectTrigger className="w-full max-w-md">
                  <SelectValue placeholder="Choose a property to manage units" />
                </SelectTrigger>
                <SelectContent>
                  {properties?.map((property) => (
                    <SelectItem key={property.id} value={property.id.toString()}>
                      {property.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedProperty && (
              <div className="flex justify-between items-center pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  {units?.length || 0} unit{units?.length !== 1 ? 's' : ''} in this property
                </p>
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-sky-blue hover:bg-sky-blue/90">
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Unit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Create New Unit</DialogTitle>
                      <DialogDescription>
                        Add a new unit to {properties?.find(p => p.id === selectedProperty)?.name}
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCreateUnit}>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="unitNumber">Unit Number *</Label>
                            <Input id="unitNumber" name="unitNumber" placeholder="101" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="floor">Floor</Label>
                            <Input id="floor" name="floor" type="number" placeholder="1" />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="bedrooms">Bedrooms *</Label>
                            <Input id="bedrooms" name="bedrooms" type="number" min="0" placeholder="2" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="bathrooms">Bathrooms *</Label>
                            <Input id="bathrooms" name="bathrooms" type="number" step="0.5" min="0" placeholder="1.5" required />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="squareFeet">Square Feet</Label>
                          <Input id="squareFeet" name="squareFeet" type="number" placeholder="850" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="rentAmount">Monthly Rent ($) *</Label>
                            <Input id="rentAmount" name="rentAmount" type="number" step="0.01" placeholder="1650.00" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="depositAmount">Security Deposit ($) *</Label>
                            <Input id="depositAmount" name="depositAmount" type="number" step="0.01" placeholder="1650.00" required />
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Switch id="isAvailable" name="isAvailable" defaultChecked />
                          <Label htmlFor="isAvailable">Available for rent</Label>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="availableDate">Available Date</Label>
                          <Input id="availableDate" name="availableDate" type="date" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit" disabled={createUnit.isPending}>
                          {createUnit.isPending ? "Creating..." : "Create Unit"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Units List */}
      {selectedProperty && (
        <div className="grid gap-4">
          {unitsLoading ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">Loading units...</p>
              </CardContent>
            </Card>
          ) : units && units.length > 0 ? (
            units.map((unit) => {
              const rentAmount = (unit.rentAmount / 100).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
              });
              const bathrooms = unit.bathrooms / 10;

              return (
                <Card key={unit.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-bold">Unit {unit.unitNumber}</h3>
                          {unit.floor !== null && (
                            <Badge variant="outline">Floor {unit.floor}</Badge>
                          )}
                          {unit.isAvailable ? (
                            <Badge className="bg-green-500 text-white">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Available
                            </Badge>
                          ) : (
                            <Badge variant="secondary">
                              <XCircle className="h-3 w-3 mr-1" />
                              Occupied
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span className="font-semibold">{rentAmount}/mo</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Bed className="h-4 w-4 text-muted-foreground" />
                            <span>{unit.bedrooms} Bed</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Bath className="h-4 w-4 text-muted-foreground" />
                            <span>{bathrooms} Bath</span>
                          </div>
                          {unit.squareFeet && (
                            <div className="flex items-center gap-1">
                              <Square className="h-4 w-4 text-muted-foreground" />
                              <span>{unit.squareFeet.toLocaleString()} sqft</span>
                            </div>
                          )}
                        </div>

                        {unit.availableDate && (
                          <p className="text-sm text-muted-foreground">
                            Available from: {new Date(unit.availableDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            setEditingUnit(unit);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteUnit(unit.id, unit.unitNumber)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">No units found for this property</p>
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Unit
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Edit Dialog */}
      {editingUnit && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Unit {editingUnit.unitNumber}</DialogTitle>
              <DialogDescription>
                Update unit details for {properties?.find(p => p.id === selectedProperty)?.name}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleUpdateUnit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-unitNumber">Unit Number *</Label>
                    <Input id="edit-unitNumber" name="unitNumber" defaultValue={editingUnit.unitNumber} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-floor">Floor</Label>
                    <Input id="edit-floor" name="floor" type="number" defaultValue={editingUnit.floor || ""} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-bedrooms">Bedrooms *</Label>
                    <Input id="edit-bedrooms" name="bedrooms" type="number" min="0" defaultValue={editingUnit.bedrooms} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-bathrooms">Bathrooms *</Label>
                    <Input id="edit-bathrooms" name="bathrooms" type="number" step="0.5" min="0" defaultValue={editingUnit.bathrooms / 10} required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-squareFeet">Square Feet</Label>
                  <Input id="edit-squareFeet" name="squareFeet" type="number" defaultValue={editingUnit.squareFeet || ""} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-rentAmount">Monthly Rent ($) *</Label>
                    <Input id="edit-rentAmount" name="rentAmount" type="number" step="0.01" defaultValue={(editingUnit.rentAmount / 100).toFixed(2)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-depositAmount">Security Deposit ($) *</Label>
                    <Input id="edit-depositAmount" name="depositAmount" type="number" step="0.01" defaultValue={(editingUnit.depositAmount / 100).toFixed(2)} required />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="edit-isAvailable" name="isAvailable" defaultChecked={editingUnit.isAvailable} />
                  <Label htmlFor="edit-isAvailable">Available for rent</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-availableDate">Available Date</Label>
                  <Input 
                    id="edit-availableDate" 
                    name="availableDate" 
                    type="date" 
                    defaultValue={editingUnit.availableDate ? new Date(editingUnit.availableDate).toISOString().split('T')[0] : ""}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => {
                  setIsEditDialogOpen(false);
                  setEditingUnit(null);
                }}>
                  Cancel
                </Button>
                <Button type="submit" disabled={updateUnit.isPending}>
                  {updateUnit.isPending ? "Updating..." : "Update Unit"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
