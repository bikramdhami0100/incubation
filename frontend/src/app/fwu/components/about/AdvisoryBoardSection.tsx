"use client"
import SectionTitle from '../shared/SectionTitle';
import TeamMemberCard, { Member } from './TeamMemberCard'; // Reusing the card
import { useEffect, useState, useRef } from 'react';

// Advisory board members data
const advisoryBoardData: Member[] = [
  {
    id: 'ab1',
    name: 'Dr. Bishnu Raj Upreti',
    role: 'Chairman, University Grants Commission',
    imageUrl: '/images/advisors/ugc-chairman.jpg',
    bio: 'Providing strategic guidance on higher education policy and development.',
    linkedin: 'https://linkedin.com/in/bishnuupreti'
  },
  {
    id: 'ab2',
    name: 'Prof. Dr. Bhim Prasad Subedi',
    role: 'Former Dean, Tribhuvan University',
    imageUrl: '/images/advisors/tu-dean.jpg',
    bio: 'Offering expertise in academic program development and quality assurance.',
    linkedin: 'https://linkedin.com/in/bhimsubedi'
  },
  {
    id: 'ab3',
    name: 'Dr. Meena Sharma',
    role: 'International Education Consultant',
    imageUrl: '/images/advisors/education-consultant.jpg',
    bio: 'Advising on international partnerships and global education standards.',
    twitter: 'https://twitter.com/meenasharma'
  },
  {
    id: 'ab4',
    name: 'Mr. Rajendra Sharma',
    role: 'Industry Representative',
    imageUrl: '/images/advisors/industry-rep.jpg',
    bio: 'Bridging academia and industry to enhance employment opportunities for graduates.',
    email: 'rajendra@example.com'
  },
  {
    id: 'ab5',
    name: 'Dr. Sushila Thapa',
    role: 'Research & Innovation Expert',
    imageUrl: '/images/advisors/research-expert.jpg',
    bio: 'Guiding research initiatives and promoting innovation across disciplines.',
    linkedin: 'https://linkedin.com/in/sushilathapa'
  },
  {
    id: 'ab6',
    name: 'Mr. Dipak Bhatta',
    role: 'Community Representative',
    imageUrl: '/images/advisors/community-rep.jpg',
    bio: 'Representing community interests and facilitating university-community engagement.',
    email: 'dipak@example.com'
  },
];

const AdvisoryBoardSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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
    const currentRef = sectionRef.current;

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

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%234a90e2\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
      }}></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <SectionTitle title="Our Esteemed Advisory Board" subtitle="Guidance & Expertise" />
          <p className="text-center text-gray-700 max-w-3xl mx-auto mb-12">
            Our advisory board brings together distinguished professionals from academia, industry, and the community
            to provide strategic guidance and ensure the university&#39;s continued growth and relevance.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {advisoryBoardData.map((member, index) => (
            <div
              key={member.id}
              className={`transform transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <TeamMemberCard member={member} />
            </div>
          ))}
        </div>

        {/* Quote section */}
        <div className={`mt-16 text-center transition-all duration-700 delay-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <blockquote className="bg-white p-8 rounded-xl shadow-lg border border-blue-100 max-w-3xl mx-auto relative">
            {/* Large quote marks */}
            <div className="absolute top-4 left-4 text-blue-200 opacity-50 text-6xl font-serif">&ldquo;</div>
            <div className="absolute bottom-4 right-4 text-blue-200 opacity-50 text-6xl font-serif">&rdquo;</div>

            <p className="text-xl text-gray-700 italic relative z-10 mb-4">
              The advisory board is committed to supporting Far Western University in its mission to provide quality education
              and enhance research and innovation to meet the needs of society and contribute to national development.
            </p>
            <footer className="text-gray-600">
              <strong>Advisory Board Statement</strong>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default AdvisoryBoardSection;