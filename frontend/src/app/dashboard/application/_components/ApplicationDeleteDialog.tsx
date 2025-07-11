import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { ApplicationItem } from "./EditDetails ";
import { getCookie } from "@/app/fwucontext/CustomCookies";

export default function ApplicationDeleteDialog({
  item,
  onClose,
  refetch,
}: {
  item: ApplicationItem & {
    // Assuming the item has these properties based on your previous code;
    status: string;
    end_date: string;
  };
  onClose: () => void;
  refetch: () => void;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/application/${item.id}`,{
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${getCookie("token")}`,
        },
      });
      toast.success("Application deleted successfully!");
      refetch();
      onClose();
    } catch (error) {
      toast.error("Failed to delete application.");
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={item != null} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg text-red-600 flex items-center gap-2">
            <Trash2 className="w-5 h-5" /> Delete Application
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Are you sure you want to permanently delete the application{" "}
            <span className="font-semibold text-black">{item.title}</span>? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            className="bg-red-600 text-white hover:bg-red-700 flex-1"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Deleting...
              </>
            ) : (
              "Confirm Delete"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
