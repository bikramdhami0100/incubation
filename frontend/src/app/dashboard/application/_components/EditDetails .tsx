import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { toast } from "sonner";
import { getCookie } from "@/app/fwucontext/CustomCookies";
export interface ApplicationItem {
  id: number;
  title: string;
  description: string;
  status: string;
  end_date: string;
}
interface ApplicationEditDialogProps {
  item: ApplicationItem & {
    // Assuming the item has these properties based on your previous code;
    status: string;
    end_date: string;
  };
  onClose: () => void;
  refetch: () => void;
}
export default function ApplicationEditDialog({ item, onClose, refetch }: ApplicationEditDialogProps) {
  const [formData, setFormData] = useState({
    title: item.title,
    description: item.description,
    status: item.status,
    end_date: item.end_date?.slice(0, 16) || "", // format for datetime-local input
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (value: string) => {
    setFormData(prev => ({ ...prev, status: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // console.log(formData,"this is form data");
    try {

      
   const response=   await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/application/${item.id}`, formData, {
        headers: {
          
          "Content-Type": "application/json",
          // Accept: "application/json",
          Authorization: `Bearer ${getCookie('token')}`,
        },
      });
      console.log(response.data,"this is response");
      toast.success("Application updated successfully!");
      refetch();
      onClose(); // close dialog
    } catch (error) {
      toast.error("Failed to update application.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  console.log(formData,"this is form data");
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Application</DialogTitle>
          <DialogDescription>Update your application details below.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              disabled={isSubmitting}
              rows={4}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label>Status</Label>
              <Select defaultValue={formData.status}  onValueChange={handleStatusChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <Label>End Date</Label>
              <Input
                type="datetime-local"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 text-white hover:bg-blue-700 flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
