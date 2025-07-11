// components/faq/FaqItem.tsx
import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FaqItemProps {
  question: string;
  answer: string;
  isOpenDefault?: boolean;
  isHighlighted?: boolean;
  searchTerm?: string;
}

const FaqItem: React.FC<FaqItemProps> = ({
  question,
  answer,
  isOpenDefault = false,
  isHighlighted = false,
  searchTerm = ''
}) => {
  const [isOpen, setIsOpen] = useState(isOpenDefault);

  // Open the FAQ item when it becomes highlighted
  useEffect(() => {
    if (isHighlighted && searchTerm) {
      setIsOpen(true);
    }
  }, [isHighlighted, searchTerm]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  // Function to highlight search terms in text
  const highlightText = (text: string) => {
    if (!searchTerm) return text;

    // Escape special characters in the search term for regex
    const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedSearchTerm})`, 'gi');

    // Split the text by the search term
    const parts = text.split(regex);

    // If no matches, return the original text
    if (parts.length <= 1) return text;

    // Return the text with highlighted parts
    return parts.map((part, i) =>
      regex.test(part) ? <mark key={i} className="bg-yellow-200 px-0.5 rounded">{part}</mark> : part
    );
  };

  return (
    <div className={`border-b border-gray-200 last:border-b-0 ${isHighlighted ? 'bg-indigo-50/50' : ''}`}>
      <button
        onClick={toggleOpen}
        className={`flex justify-between items-center w-full py-5 px-6 text-left transition-colors focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75 ${
          isOpen
            ? 'bg-indigo-50 hover:bg-indigo-100'
            : 'hover:bg-gray-50'
        }`}
        aria-expanded={isOpen}
      >
        <h3 className={`text-lg font-medium ${isOpen ? 'text-indigo-700' : 'text-gray-900'}`}>
          {searchTerm ? highlightText(question) : question}
        </h3>
        <div className={`flex-shrink-0 ml-4 p-1 rounded-full ${isOpen ? 'bg-indigo-100 text-indigo-600' : 'text-gray-500'}`}>
          {isOpen ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6 pt-2">
          <div className="text-gray-700 leading-relaxed prose prose-sm max-w-none">
            {typeof answer === 'string' && searchTerm
              ? (
                <p>
                  {highlightText(answer)}
                </p>
              )
              : (
                <p>{answer}</p>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqItem;