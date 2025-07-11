"use client"
import { useState, useEffect, useRef } from 'react';
import FaqSection from "../components/faq/FaqSection";
import Image from 'next/image';
import Link from 'next/link';
import { Search, MessageCircle, ArrowRight } from 'lucide-react';

export default function FaqPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    // Store current ref value in a variable to use in cleanup
    const currentRef = heroRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      // Use the stored ref value in cleanup
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const faqData = [
    {
      id: 'faq1',
      question: 'What is the FWU Incubation Center?',
      answer: 'The FWU Incubation Center is a dedicated hub at Far Western University designed to foster innovation and entrepreneurship. We provide resources, mentorship, and a supportive environment for startups and aspiring entrepreneurs to develop their ideas into viable businesses. The center aims to bridge the gap between academic knowledge and practical business implementation.',
      category: 'General',
    },
    {
      id: 'faq2',
      question: 'Who can apply to the incubation programs?',
      answer: 'Our programs are open to students, alumni, and faculty of Far Western University. We also welcome applications from external individuals or teams with innovative ideas that align with our mission and focus areas. We particularly encourage applications from entrepreneurs in the Far Western region of Nepal who are working on solutions to local challenges.',
      category: 'Eligibility',
    },
    {
      id: 'faq3',
      question: 'What kind of support does the center offer?',
      answer: 'We offer a comprehensive range of support, including: dedicated co-working space, mentorship from industry experts and successful entrepreneurs, business development training, specialized workshops (finance, marketing, legal, etc.), networking opportunities with potential investors and partners, technical assistance for prototype development, and guidance for accessing funding opportunities.',
      category: 'Services',
    },
    {
      id: 'faq4',
      question: 'Is there a fee to join the incubation program?',
      answer: 'Most of our core incubation programs have nominal or no upfront fees for FWU students and alumni. Some specialized workshops or advanced programs might have a cost, which will be clearly communicated. For external participants, there may be a modest fee structure based on the services utilized. We aim to make our resources accessible to promising entrepreneurs regardless of their financial situation.',
      category: 'Fees & Funding',
    },
    {
      id: 'faq5',
      question: 'How long is the incubation program?',
      answer: 'The duration of our incubation programs typically ranges from 6 months to 2 years, depending on the program structure and the startup\'s stage of development. Our standard program is 12 months with possible extension based on progress and needs. We also offer shorter 3-month pre-incubation programs and specialized bootcamps lasting 2-4 weeks for specific skill development.',
      category: 'Program Details',
    },
    {
      id: 'faq6',
      question: 'Do I need to have a fully developed business plan to apply?',
      answer: 'While a detailed business plan is helpful, it\'s not a strict requirement for initial application. We look for a clear problem statement, a viable solution approach, a passionate team, and a basic understanding of your target market. Our pre-incubation program helps you develop a comprehensive business plan, and our mentors will guide you through this process during the incubation period.',
      category: 'Application Process',
    },
    {
      id: 'faq7',
      question: 'Does the incubation center take equity in startups?',
      answer: 'Our standard incubation programs do not require equity. However, for startups receiving significant financial support or investment through our network, equity terms might be discussed on a case-by-case basis. Any such arrangements would be transparently communicated and negotiated separately from the basic incubation services.',
      category: 'Fees & Funding',
    },
    {
      id: 'faq8',
      question: 'What industries or sectors does the incubation center focus on?',
      answer: 'While we welcome innovative ideas from all sectors, we have particular expertise and resources in: Agricultural Technology, Renewable Energy, Information Technology, Education Technology, Healthcare Innovation, and Social Entrepreneurship. These focus areas align with the development priorities of Nepal\'s Far Western region and the research strengths of Far Western University.',
      category: 'Program Details',
    },
    {
      id: 'faq9',
      question: 'How can I apply to the incubation program?',
      answer: 'Applications can be submitted through our online portal on this website. The application process typically includes: completing an application form with basic information about your team and idea, submitting a pitch deck or concept note, and if shortlisted, participating in an interview with our selection committee. We have quarterly application cycles, but promising ideas may be considered on a rolling basis.',
      category: 'Application Process',
    },
    {
      id: 'faq10',
      question: 'What is the selection criteria for startups?',
      answer: 'Our selection committee evaluates applications based on: innovation and uniqueness of the idea, market potential and scalability, feasibility and technical viability, social impact (particularly for the Far Western region), team composition and capabilities, alignment with our focus areas, and potential for growth and sustainability. We value diverse teams and ideas that address meaningful problems.',
      category: 'Application Process',
    },
    {
      id: 'faq11',
      question: 'Can I access the incubation center facilities without joining the full program?',
      answer: 'Yes, we offer flexible engagement options. You can apply for co-working space access, participate in specific workshops, or join our community events without enrolling in the full incubation program. We also have a membership model that allows entrepreneurs to access certain resources on an as-needed basis.',
      category: 'Services',
    },
    {
      id: 'faq12',
      question: 'Does the incubation center help with funding?',
      answer: 'While we don\'t directly provide funding to all startups, we do help connect promising ventures with potential investors, prepare for pitching opportunities, and navigate grant applications. We also organize demo days where selected startups can present to investors. Additionally, we have a small seed fund for exceptional startups that demonstrate significant progress during the incubation period.',
      category: 'Fees & Funding',
    },
    {
      id: 'faq13',
      question: 'What happens after the incubation program ends?',
      answer: 'Graduating startups become part of our alumni network and continue to receive support through: networking opportunities, access to our events and resources, connections to our partner organizations, and potential follow-on support for scaling. We maintain long-term relationships with our incubated companies and celebrate their continued growth and success.',
      category: 'Program Details',
    },
    {
      id: 'faq14',
      question: 'Is the incubation center affiliated with any international organizations?',
      answer: 'Yes, the FWU Incubation Center collaborates with several international organizations and university incubators. These partnerships enable knowledge exchange, access to global networks, and opportunities for our startups to participate in international programs. We regularly host international mentors and organize exchange programs with partner incubators.',
      category: 'General',
    },
    {
      id: 'faq15',
      question: 'How can I get involved as a mentor or investor?',
      answer: 'We welcome experienced professionals, entrepreneurs, and investors to join our mentor network or investor community. Mentors can contribute their expertise through workshops, one-on-one mentoring sessions, or as advisors to specific startups. Investors can participate in our demo days and gain early access to promising ventures. Please contact us through the "Get Involved" section of our website.',
      category: 'Community',
    },
  ];

  // Filter FAQs based on search query
  const filteredFaqs = searchQuery
    ? faqData.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqData;

  return (
    <main className="bg-white overflow-hidden">
      {/* Hero Section with Search */}
      <div
        ref={heroRef}
        className="relative py-20 md:py-28 bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 text-white overflow-hidden"
      >
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-indigo-500 opacity-10 animate-float-slow"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-blue-500 opacity-10 animate-float-reverse"></div>
          <div className="absolute top-1/2 left-1/4 w-32 h-32 rounded-full bg-purple-500 opacity-5 animate-pulse"></div>
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-block mb-6 p-2 bg-indigo-800/30 rounded-full">
              <div className="px-4 py-1 bg-indigo-700/50 rounded-full">
                <span className="text-indigo-100 font-medium">FWU Incubation Center</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">Questions</span>
            </h1>

            <p className="text-xl text-indigo-100 max-w-3xl mx-auto mb-10 leading-relaxed">
              Find answers to common questions about the FWU Incubation Center, our programs, and how we support entrepreneurs.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mt-8 relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for questions or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-4 px-6 pl-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-300 text-xl" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-indigo-300 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
              {searchQuery && (
                <div className="absolute mt-2 text-left text-indigo-200 text-sm">
                  Found {filteredFaqs.length} {filteredFaqs.length === 1 ? 'result' : 'results'} for {searchQuery}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* FAQ Section */}
      <FaqSection faqs={filteredFaqs} searchQuery={searchQuery} />

      {/* Still Have Questions Section */}
      <section className="py-20 bg-gradient-to-b from-indigo-50 to-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100 rounded-full opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100 rounded-full opacity-30 translate-x-1/4 translate-y-1/4"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-indigo-100">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-indigo-900 mb-4">Still Have Questions?</h2>
                <p className="text-gray-600 mb-6">
                  Our team is here to help you with any questions you may have about the FWU Incubation Center, our programs, or the application process.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-indigo-900">Email Us</h3>
                      <p className="text-gray-600">info@fwu.edu.np</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-indigo-900">Call Us</h3>
                      <p className="text-gray-600">+977-099-520729</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <Link
                    href="/fwu/contact"
                    className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition-all duration-300 hover:-translate-y-1"
                  >
                    Contact Us
                    <ArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>
              <div className="relative h-64 md:h-auto">
                <Image
                  src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Contact our team"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/60 to-indigo-800/40"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white p-6">
                    <MessageCircle className="mx-auto text-4xl mb-3" />
                    <h3 className="text-xl font-bold mb-2">Get Personalized Help</h3>
                    <p className="text-indigo-100 text-sm">
                      Schedule a one-on-one consultation with our team
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}