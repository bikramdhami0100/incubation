import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, Loader2 } from "lucide-react";
import { useState, FormEvent, ChangeEvent } from "react";
import { toast } from "sonner";
import axios from "axios";
import { getCookie } from "@/app/fwucontext/CustomCookies";

// --- Form Type ---
// --- Form Type ---
interface FormDataState {
  title: string;
  description: string;
  end_date: string;
  status: string;
}

// --- Initial State ---
const initialFormState: FormDataState = {
  title: "",
  description: "",
  end_date: "",
  status: "open",
};

interface ApplicationFormProps {
  onSuccess?: () => void;
  refetch: () => void;
}

// --- Component ---
export default function ApplicationForm({
  onSuccess,
  refetch,
}: ApplicationFormProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<FormDataState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<FormDataState>>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const errs: Partial<FormDataState> = {};
    if (!formData.title.trim()) errs.title = "Title is required";
    if (!formData.description.trim())
      errs.description = "Description is required";
    return errs;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      const token=getCookie('token');
      const errs = validate();
      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        return;
      }

      setIsSubmitting(true);
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/application`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Application submitted successfully!");
        setFormData(initialFormState);
        console.log(res.data);
        setOpen(false);
        onSuccess?.();
      } catch (error) {
        toast.error("Failed to submit application." + error);
      } finally {
        setIsSubmitting(false);
        refetch();
      }
    }
  };

  return (
    <Dialog  open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 cursor-pointer p-2 text-white  rounded-lg hover:bg-blue-700 transition-all">
          <Plus className="h-5 w-5 " /> Add Application
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Submit New Application</DialogTitle>
          <DialogDescription>
            Fill out the form to apply for incubation.
          </DialogDescription>
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
              placeholder="e.g. Smart Agriculture Project"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              disabled={isSubmitting}
              placeholder="Describe your project idea..."
              rows={4}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>
          <div>
            <Label htmlFor="end_date">End Date</Label>
            <Input
              id="end_date"
              name="end_date"
              type="datetime-local"
              value={formData.end_date}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full mt-1 border rounded px-3 py-2 text-sm"
            >
              <option value="open">Open</option>
              <option value="closed">Closed</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
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
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
