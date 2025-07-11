
import React, { useState } from 'react';
import { X, Download, ZoomIn, ZoomOut, RotateCw, Maximize2, FileText } from 'lucide-react';

interface PDFViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
  onDownload?: () => void;
}

const PDFViewerModal: React.FC<PDFViewerModalProps> = ({
  isOpen,
  onClose,
  pdfUrl,
  title,
  onDownload,
}) => {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!isOpen) return null;

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 25, 50));
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleDownload = () => {
    if (onDownload) {
      onDownload();
    } else {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = title;
      link.click();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gray-300 bg-opacity-50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className={`relative z-10 h-full flex flex-col ${isFullscreen ? 'p-0' : 'p-4'}`}>
        <div
          className={`bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col w-full ${
            isFullscreen ? 'h-full rounded-none' : 'max-h-[95vh] max-w-full md:max-w-6xl mx-auto'
          }`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 sm:px-6 flex items-center justify-between text-white">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-semibold truncate max-w-[200px] sm:max-w-md">
                  {title}
                </h2>
                <p className="text-blue-100 text-sm hidden sm:block">PDF Document</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button onClick={handleDownload} className="p-2 hover:bg-opacity-20 rounded-lg" title="Download PDF">
                <Download className="w-5 h-5" />
              </button>
              <button onClick={toggleFullscreen} className="p-2 hover:bg-opacity-20 rounded-lg" title="Fullscreen">
                <Maximize2 className="w-5 h-5" />
              </button>
              <button onClick={onClose} className="p-2 hover:bg-opacity-20 rounded-lg" title="Close">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Toolbar */}
          <div className="bg-gray-50 border-b px-4 py-2 sm:px-6 flex flex-wrap items-center justify-between gap-y-2">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white rounded-lg px-3 py-1.5 border">
                <button
                  onClick={handleZoomOut}
                  className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
                  disabled={zoom <= 50}
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4 text-gray-600" />
                </button>
                <span className="text-sm font-medium text-gray-700 w-[50px] text-center">{zoom}%</span>
                <button
                  onClick={handleZoomIn}
                  className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
                  disabled={zoom >= 200}
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              <button
                onClick={handleRotate}
                className="flex items-center space-x-2 px-3 py-1.5 bg-white rounded-lg border hover:bg-gray-50 transition-colors"
                title="Rotate PDF"
              >
                <RotateCw className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700 hidden sm:inline">Rotate</span>
              </button>
            </div>

            <div className="text-xs sm:text-sm text-gray-500 text-right w-full sm:w-auto">
              Use mouse wheel to zoom • Drag to pan
            </div>
          </div>

          {/* PDF Viewer */}
          <div className="flex-1 bg-gray-100 overflow-auto">
            <div className="h-full flex items-center justify-center p-4 sm:p-6">
              <div
                className="bg-white shadow rounded-lg mb-6 overflow-x-hidden "
                style={{
                  scrollbarWidth:"none",
                  transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                  transformOrigin: 'center center',
                  transition: 'transform 0.3s ease',
                }}
              >
                <iframe 
                style={{scrollbarWidth:"none"}}
                  src={pdfUrl}
                  className="w-[90vw] mt-20 m-auto h-screen   border-0"
                  title={title}
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 border-t px-4 sm:px-6 py-3 flex flex-wrap justify-between items-center text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <span>PDF Viewer</span>
              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
              <span>High Quality Rendering</span>
            </div>
            <div className="mt-2 sm:mt-0">
              <span>Powered by Browser PDF Engine</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFViewerModal;
