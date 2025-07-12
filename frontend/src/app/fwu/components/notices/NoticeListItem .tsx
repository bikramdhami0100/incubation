import { useState } from "react";
import { Eye, FileDown, Clock, Calendar, ChevronDown, ChevronUp, Megaphone } from "lucide-react";
import PDFViewerModal from "@/app/dashboard/notice/_component/PDFViewerModel";
// import PDFViewerModal from ""; // Adjust the import path
interface NoticeListItemProps {
  notice: {
    id: number;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    file?: string;
    fileUrl?: string;
    admin?: {
      name: string;
      role: string;
      profileImage: string;
    };
    isRecent: boolean;
    relativeTime: string;
    formattedDate: string;
  };
  index: number;
}

export default function NoticeListItem({ notice, index }: NoticeListItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);

  const parseDescription = (desc: string): string => {
    try {
      const parsed = JSON.parse(desc);
      return parsed.description || desc;
    } catch {
      return desc;
    }
  };

  const displayDescription = parseDescription(notice.description);
  const isLongDescription = displayDescription.length > 180;

  const handleDownload = () => {
    if (notice.fileUrl) window.open(notice.fileUrl, "_blank");
  };

  const handleShowPdf = () => {
    if (notice.fileUrl) setIsPdfViewerOpen(true);
  };

const gradientBackgrounds = {
  sunset: "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500",
  ocean: "bg-gradient-to-r from-blue-500 via-teal-400 to-green-500",
  sky: "bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500",
  fire: "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500",
  forest: "bg-gradient-to-r from-green-600 via-emerald-500 to-lime-400",
  violet: "bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500"
} as const;

type GradientKey = keyof typeof gradientBackgrounds;

function getRandomGradient() {
  const keys = Object.keys(gradientBackgrounds) as GradientKey[];
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return gradientBackgrounds[randomKey];
}

console.log(notice)
  return (
    <>
      {isPdfViewerOpen && notice.fileUrl && (
        <PDFViewerModal
          isOpen={isPdfViewerOpen}
          onClose={() => setIsPdfViewerOpen(false)}
          pdfUrl={notice.fileUrl}
          title={notice.title}
          onDownload={handleDownload}
        />
      )}

      <div
        className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 hover:border-indigo-200 transition-all duration-500 overflow-hidden transform hover:-translate-y-2 ${
          notice.isRecent ? "ring-2 ring-indigo-200/50 border-indigo-100" : ""
        }`}
        style={{ 
          animationDelay: `${index * 120}ms`,
          animation: 'fadeInUp 0.8s ease-out both'
        }}
      >
        {/* Background decorative elements */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-full opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500"></div>
        <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-gradient-to-tr from-purple-100 to-indigo-100 rounded-full opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500"></div>

        {/* Subtle pattern overlay */}
        <div 
          className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500"
          style={{
            backgroundImage: 'radial-gradient(#4338ca 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        ></div>

      
        {/* Header Section */}
        <div className={` relative p-8 ${getRandomGradient()}`}>
          <div className="flex items-start gap-4 ">
            <div className="flex-shrink-0 mt-1">
              <div className="w-14 h-14   rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <Megaphone className="w-7 h-7 text-white" />
                
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-indigo-700 transition-colors duration-300 leading-tight">
                {notice.title}
              </h3>
              
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full">
                  <Clock className="w-4 h-4 text-indigo-500" />
                  <span className="font-medium">{notice.relativeTime}</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full">
                  <Calendar className="w-4 h-4 text-indigo-500" />
                  <span className="font-medium">{notice.formattedDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="relative px-8 pb-6">
          <div className="text-gray-700 text-base leading-relaxed">
            <p className={!isExpanded && isLongDescription ? "line-clamp-3" : ""}>
              {displayDescription}
            </p>
            
            {isLongDescription && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center gap-2 mt-4 text-indigo-600 hover:text-indigo-700 font-semibold text-sm transition-colors duration-300 group/btn"
              >
                {isExpanded ? (
                  <>
                    Show Less 
                    <ChevronUp className="w-4 h-4 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                  </>
                ) : (
                  <>
                    Read More 
                    <ChevronDown className="w-4 h-4 group-hover/btn:translate-y-0.5 transition-transform duration-300" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Footer Section */}
        <div className="relative bg-gradient-to-r from-gray-50 to-indigo-50/30 border-t border-gray-100 px-8 py-6">
          <div className="flex items-center justify-between">
            {/* File Actions */}
            {notice.file && (
              <div className="flex items-center gap-4">
                <button
                  onClick={handleShowPdf}
                  className="inline-flex cursor-pointer items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 transform"
                >
                  <Eye className="w-4 h-4" />
                  View PDF
                </button>
                
                <button
                  onClick={handleDownload}
                  className="inline-flex cursor-pointer items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 hover:text-indigo-700 text-sm font-semibold rounded-xl border-2 border-gray-200 hover:border-indigo-300 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <FileDown className="w-4 h-4" />
                  Download
                </button>
              </div>
            )}
            
            {!notice.file && <div></div>}

            {/* Update Info */}
            {/* {notice.createdAt !== notice.updatedAt && (
              <div className="text-sm">
                <span className="bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 px-3 py-1.5 rounded-full font-medium border border-orange-200">
                  Updated: {new Date(notice.updatedAt).toLocaleDateString()}
                </span>
              </div>
            )} */}
          </div>
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"></div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}

// Export the main component for use in your application