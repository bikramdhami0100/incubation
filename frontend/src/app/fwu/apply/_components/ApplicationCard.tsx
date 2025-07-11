import { Button } from "@/components/ui/button";
import { CalendarDays, RefreshCcw, ArrowRight } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import ApplicationForm from "../../components/apply/ApplicationForm";
import { Application } from "../page";

interface ApplicationCardProps {
  applications: Application[];
}

// Status badge component for better visual hierarchy
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'closed':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'completed':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in review':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
      {status}
    </span>
  );
};

export default function ApplicationCards({ applications }: ApplicationCardProps) {
  return (
    <div className="px-4 mt-4 sm:px-6 lg:px-8 w-full">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {applications.map((app) => (
          <div
            key={app.id}
            className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 overflow-hidden"
          >
            {/* Header with image and status */}
            <div className="relative p-6 pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative flex justify-between items-center w-full">
                      <Image
                        alt={app.title}
                        quality={100}
                        width={48}
                        height={48}
                        priority
                        src={`/logo.png`}
                        className="size-12 w-12 h-12 rounded-full object-contain shadow-sm border border-gray-100"
                      />
                    </div>
                    <div className="flex-1">
                      <StatusBadge status={app.status} />
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {app.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                    {app.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Metadata section */}
            <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CalendarDays className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">Deadline:</span>
                  <span className="text-gray-900">
                    {new Date(app.end_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <RefreshCcw className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">Updated:</span>
                  <span className="text-gray-900">
                    {new Date(app.updated_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Action button */}
            <div className="p-6 pt-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    className="w-full cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl w-full max-h-[90vh] overflow-y-auto p-0 rounded-xl">
                  <div className="p-6">
                    <ApplicationForm application_id={app.id} />
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Subtle gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-purple-50/0 group-hover:from-blue-50/20 group-hover:to-purple-50/10 transition-all duration-300 pointer-events-none opacity-0 group-hover:opacity-100" />
          </div>
        ))}
      </div>

      {/* Empty state */}
      {applications.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <CalendarDays className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            There are currently no applications available. Check back later for new opportunities.
          </p>
        </div>
      )}
    </div>
  );
}