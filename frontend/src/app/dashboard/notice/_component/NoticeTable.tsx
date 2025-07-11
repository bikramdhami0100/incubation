import React, { useState } from "react";
import {
  Bell,
  Download,
  Eye,
  Calendar,
  User,
  File,
  Edit3,
  Trash2,
} from "lucide-react";
import { NoticeItem } from "../notice_type/notice";

// Import your PDF Viewer component
import PDFViewerModal from "./PDFViewerModel"; // Adjust the import path

interface NoticeTableProps {
  notices: NoticeItem[];
  isEditModelOpen: { select: string; item: NoticeItem | null };
  setIsEditModelOpen: React.Dispatch<
    React.SetStateAction<{ select: string; item: NoticeItem | null }>
  >;
}

const NoticeTable: React.FC<NoticeTableProps> = ({ 
  notices, 
  setIsEditModelOpen 
}) => {
  // Add state for PDF viewer
  const [isPDFViewerOpen, setIsPDFViewerOpen] = useState(false);
  const [currentPDF, setCurrentPDF] = useState<{
    url: string;
    title: string;
    notice: NoticeItem;
  } | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDownload = (noticeId: number, notice: NoticeItem) => {
    console.log(`Downloading: ${noticeId}`);
    console.log(`Downloading: ${notice.file}`);
    const createUrl = `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/notices/${notice.file}`;
    const link = document.createElement("a");
    link.href = createUrl;
    link.download = notice.title;
    link.click();
  };

  // New function to handle PDF viewing
  const handleViewPDF = (notice: NoticeItem) => {
    if (notice.file) {
      const pdfUrl = `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/notices/${notice.file}`;
      setCurrentPDF({
        url: pdfUrl,
        title: notice.title,
        notice: notice
      });
      setIsPDFViewerOpen(true);
    } else {
      // If no file, show the regular view modal
      setIsEditModelOpen({ select: "view", item: notice });
    }
  };

  const handlePDFDownload = () => {
    if (currentPDF) {
      handleDownload(currentPDF.notice.id, currentPDF.notice);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notice Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Added By
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {notices.map((notice) => (
                <tr
                  key={notice.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Bell className="w-5 h-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-900 mb-1">
                          {notice.title}
                        </h4>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {notice.description}
                        </p>
                        {notice.file && (
                          <div className="mt-2 flex items-center text-xs text-blue-600">
                            <File className="w-4 h-4 mr-1" />
                            PDF Attachment Available
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {notice.admin.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {notice.admin.role}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center mb-1">
                        <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                        <span className="text-xs text-gray-500">Added:</span>
                      </div>
                      <p className="text-xs font-medium">
                        {formatDate(notice.created_at)}
                      </p>
                      {notice.created_at !== notice.updated_at && (
                        <div className="mt-2">
                          <div className="flex items-center mb-1">
                            <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                            <span className="text-xs text-gray-500">
                              Updated:
                            </span>
                          </div>
                          <p className="text-xs font-medium">
                            {formatDate(notice.updated_at)}
                          </p>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 w-[20%] ">
                    <div className="grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-2  ">
                      {/* View Button - Modified to handle PDF viewing */}
                      <button 
                        onDoubleClick={() => setIsEditModelOpen({ select: "view2", item: notice })} 
                        onClick={() => handleViewPDF(notice)} 
                        className="inline-flex cursor-pointer items-center px-3 py-1.5 text-xs font-medium rounded-lg text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors w-18"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </button>
                    
                      {/* Download Button */}
                      {notice.file && (
                        <button
                          onClick={() => handleDownload(notice?.id, notice)}
                          className="inline-flex cursor-pointer items-center px-3 py-1.5 text-xs font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors w-18"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          PDF
                        </button>
                      )}

                      {/* Edit Button */}
                      <button  onClick={() => setIsEditModelOpen({ select: "edit", item: notice })} className="inline-flex cursor-pointer items-center px-3 py-1.5 text-xs font-medium rounded-lg text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors w-18">
                        <Edit3 className="w-4 h-4 mr-1" />
                        Edit
                      </button>

                      {/* Delete Button */}
                      <button onClick={() => setIsEditModelOpen({ select: "delete", item: notice })} className="inline-flex cursor-pointer items-center px-3 py-1.5 text-xs font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors w-18">
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PDF Viewer Modal */}
      {currentPDF && (
        <PDFViewerModal
          isOpen={isPDFViewerOpen}
          onClose={() => {
            setIsPDFViewerOpen(false);
            setCurrentPDF(null);
          }}
          pdfUrl={currentPDF.url}
          title={currentPDF.title}
          onDownload={handlePDFDownload}
        />
      )}
    </>
  );
};

export default NoticeTable;