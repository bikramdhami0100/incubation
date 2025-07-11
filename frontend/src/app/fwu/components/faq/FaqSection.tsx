// components/faq/FaqSection.tsx
import FaqItem from './FaqItem';
import { useState, useEffect } from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import Link from 'next/link';

interface FaqData {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface FaqSectionProps {
  faqs: FaqData[];
  searchQuery?: string;
}

const FaqSection: React.FC<FaqSectionProps> = ({ faqs, searchQuery = '' }) => {
  // Category Filtering Logic
  const allCategories = ['All', ...Array.from(new Set(faqs.map(faq => faq.category)))];
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [highlightedFaqs, setHighlightedFaqs] = useState<FaqData[]>([]);

  // Reset category filter when search query changes
  useEffect(() => {
    if (searchQuery) {
      setSelectedCategory('All');
    }
  }, [searchQuery]);

  // Highlight matching text in FAQs when search query is present
  useEffect(() => {
    if (searchQuery) {
      // Mark FAQs that contain the search query for potential highlighting
      const highlighted = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setHighlightedFaqs(highlighted);
    } else {
      setHighlightedFaqs([]);
    }
  }, [searchQuery, faqs]);

  const filteredFaqs = selectedCategory === 'All'
    ? faqs
    : faqs.filter(faq => faq.category === selectedCategory);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filter Buttons */}
        <div className="mb-12 max-w-4xl mx-auto">
          {/* Mobile filter dropdown */}
          <div className="md:hidden mb-6">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full flex items-center justify-between px-5 py-3 bg-white border border-indigo-100 rounded-lg shadow-sm text-indigo-900 font-medium"
            >
              <div className="flex items-center">
                <Filter className="mr-2 text-indigo-600" />
                <span>Filter by: {selectedCategory}</span>
              </div>
              <ChevronDown className={`transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>

            {isFilterOpen && (
              <div className="mt-2 bg-white rounded-lg shadow-lg border border-indigo-100 overflow-hidden">
                {allCategories.map(category => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full text-left px-5 py-3 transition-colors ${
                      selectedCategory === category
                        ? 'bg-indigo-50 text-indigo-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop filter buttons */}
          <div className="hidden md:flex flex-wrap justify-center gap-3">
            {allCategories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white shadow-md scale-105'
                    : 'bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search results info */}
          {searchQuery && (
            <div className="mt-6 text-center text-gray-600">
              Showing {filteredFaqs.length} {filteredFaqs.length === 1 ? 'result' : 'results'} for &quot;{searchQuery}&quot;
              {selectedCategory !== 'All' && (
                <span> in category &quot;{selectedCategory}&quot;</span>
              )}
            </div>
          )}
        </div>

        {filteredFaqs.length > 0 ? (
          <div className="max-w-3xl mx-auto">
            {/* FAQ Items */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-indigo-100">
              {filteredFaqs.map((faq, index) => (
                <FaqItem
                  key={faq.id}
                  question={faq.question}
                  answer={faq.answer}
                  isHighlighted={highlightedFaqs.includes(faq)}
                  searchTerm={searchQuery}
                  isOpenDefault={index === 0 && searchQuery !== '' && highlightedFaqs.includes(faq)}
                />
              ))}
            </div>

            {/* FAQ Count */}
            <div className="mt-4 text-right text-sm text-gray-500">
              Showing {filteredFaqs.length} of {faqs.length} FAQs
            </div>
          </div>
        ) : (
          <div className="max-w-xl mx-auto text-center bg-indigo-50 p-8 rounded-xl">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-indigo-900 mb-2">No FAQs Found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery
                ? `We couldn't find any FAQs matching "${searchQuery}"`
                : `No FAQs found for the "${selectedCategory}" category.`
              }
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                // If this component is used elsewhere without search functionality
                if (typeof window !== 'undefined' && window.document.querySelector('input[type="text"]')) {
                  const searchInput = window.document.querySelector('input[type="text"]') as HTMLInputElement;
                  if (searchInput) searchInput.value = '';
                }
              }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              View All FAQs
            </button>
          </div>
        )}

        <div className="mt-16 text-center">
          <div className="max-w-2xl mx-auto bg-indigo-50 rounded-xl p-8">
            <h3 className="text-xl font-bold text-indigo-900 mb-3">Can&apos;t find the answer you&apos;re looking for?</h3>
            <p className="text-gray-600 mb-6">
              Our team is ready to assist you with any specific questions about the FWU Incubation Center.
            </p>
            <Link
              href="/fwu/contact"
              className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-5 rounded-lg shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              Contact Us
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;