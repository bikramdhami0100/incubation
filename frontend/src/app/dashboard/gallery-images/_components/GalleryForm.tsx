import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, Loader2, X, Image as ImageIcon } from "lucide-react";
import { useState, FormEvent, ChangeEvent } from "react";
import { toast } from "sonner";
import Image from "next/image";
import axios from "axios";
import { getCookie } from "@/app/fwucontext/CustomCookies";

// --- Type Definitions ---

// Defines the shape of a single category object
interface Category {
  id: number;
  name: string;
}

// Defines the props for our component
interface GalleryFormProps {
  /** An array of existing category objects to populate the dropdown. */
  categories: Category[];
  /** Optional callback to run on successful upload, e.g., to refetch data. */
  onSuccess?: () => void;
  refetch:()=>void;
}

// Defines the shape of our form data state
interface FormDataState {
  title: string;
  description: string;
  category_id: string; // The value from a <select> is always a string
  custom_category: string; // New field for custom category
  category_description: string; // Added for category description
  images: File[]; // Changed from single image to multiple images
}

// Defines the shape of our errors state object
type FormErrors = Partial<Record<keyof FormDataState, string>>;

// --- Component ---

const initialFormState: FormDataState = {
  title: '',
  description: '',
  category_id: '',
  custom_category: '',
  category_description: '',
  images: [],
};

export default function GalleryForm({ categories,refetch }: GalleryFormProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [isCustomCategory, setIsCustomCategory] = useState(false);

  const [formData, setFormData] = useState<FormDataState>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (e.target.name === "images" && (e.target as HTMLInputElement).files) {
      const files = Array.from((e.target as HTMLInputElement).files || []);
      setFormData({ ...formData, images: [...formData.images, ...files] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'custom') {
      setIsCustomCategory(true);
      setFormData({ ...formData, category_id: '', custom_category: '' });
    } else {
      setIsCustomCategory(false);
      setFormData({ ...formData, category_id: value, custom_category: '' });
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: updatedImages });
  };

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    
    if (!formData.title.trim()) {
      errs.title = "Title is required";
    }
    
    if (isCustomCategory) {
      if (!formData.custom_category.trim()) {
        errs.custom_category = "Custom category name is required";
      }
    } else {
      if (!formData.category_id) {
        errs.category_id = "Category is required";
      }
    }
    
    if (formData.images.length === 0) {
      errs.images = "At least one image is required";
    }
    
    return errs;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setSubmissionStatus(null);
    setIsSubmitting(true);

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setIsSubmitting(false);
      return;
    }

    const payload = new FormData();
    payload.append('title', formData.title);
    payload.append('description', formData.description);
    payload.append('category_description', formData.category_description);
    
    // Handle category selection
    if (isCustomCategory) {
      payload.append('category', formData.custom_category);
      payload.append('is_custom_category', 'true');
    } else {
      payload.append('category', formData.category_id);
      payload.append('is_custom_category', 'false');
    }

    // Append all images
    formData.images.forEach((image, index) => {
      payload.append(`images[${index}]`, image);
    });

    try {
      const res = (await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/gallery`, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          Authorization: `Bearer ${getCookie('token')}`,
        },
      })).data;
    console.log(res, 'this is response from gallery upload');
      if (!res) {
        // console.log(submissionStatus, 'this is submission status');
        throw new Error( 'Failed to upload images.');
      }

      toast.success(`${formData.images.length} image(s) uploaded successfully!`);
      setFormData(initialFormState); // Reset form
      setIsCustomCategory(false); // Reset custom category state
       // Call the parent's refresh function
      setOpen(false); // Close the dialog
      setSubmissionStatus({ type: 'success', message: `${formData.images.length} image(s) uploaded successfully!` });
    } catch (error) {
      console.error("Upload error:", error);
      console.log(submissionStatus, 'this is submission status');
      toast.error(error instanceof Error ? error.message : 'An unexpected error occurred.');
    } finally {
      refetch();
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="px-4 cursor-pointer py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
          <Plus className="h-5 w-5 mr-2" /> Add Images
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Gallery Images</DialogTitle>
          <DialogDescription>Fill out the form below to upload new images.</DialogDescription>
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
              placeholder="Enter gallery title" 
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              disabled={isSubmitting}
              placeholder="Enter description (optional) "
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="category_select">Category</Label>
            <select
              id="category_select"
              name="category_select"
              value={isCustomCategory ? 'custom' : formData.category_id}
              onChange={handleCategoryChange}
              disabled={isSubmitting}
              className="w-full p-2 border rounded bg-background"
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
              <option value="custom">+ Create Custom Category</option>
            </select>
            {errors.category_id && <p className="text-red-500 text-sm mt-1">{errors.category_id}</p>}
          </div>

          {isCustomCategory && (
            <div>
              <Label htmlFor="custom_category">Custom Category Name</Label>
              <Input 
                id="custom_category" 
                name="custom_category" 
                value={formData.custom_category} 
                onChange={handleChange} 
                disabled={isSubmitting}
                placeholder="Enter new category name" 
              />
              {errors.custom_category && <p className="text-red-500 text-sm mt-1">{errors.custom_category}</p>}
            </div>
          )}
           <div>
            <Label htmlFor="category_description">Description</Label>
            <Textarea 
              id="category_description" 
              name="category_description" 
              value={formData.category_description} 
              onChange={handleChange} 
              disabled={isSubmitting}
              placeholder="Enter category description "
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="images">Image Files</Label>
            <Input 
              id="images" 
              type="file" 
              name="images" 
              accept="image/*" 
              onChange={handleChange} 
              disabled={isSubmitting}
              multiple 
            />
            <p className="text-sm text-gray-500 mt-1">You can select multiple images at once</p>
            {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}
          </div>

          {/* Image Preview Section */}
          {formData.images.length > 0 && (
            <div>
              <Label>Selected Images ({formData.images.length})</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2 max-h-60 overflow-y-auto border rounded p-3">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                      <Image
                        width={100}
                        height={100}

                        src={URL.createObjectURL(image)} 
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      disabled={isSubmitting}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                    <p className="text-xs text-center mt-1 truncate">{image.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
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
              disabled={isSubmitting || formData.images.length === 0} 
              className="flex-1 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                  Uploading {formData.images.length} image(s)...
                </>
              ) : (
                <>
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Upload {formData.images.length || ''} Image(s)
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}