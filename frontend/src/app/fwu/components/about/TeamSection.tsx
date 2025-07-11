"use client"
import SectionTitle from '../shared/SectionTitle';
import TeamMemberCard, { Member } from './TeamMemberCard';
import { useEffect, useState, useRef } from 'react';

// University leadership team data
const teamMembersData: Member[] = [
  {
    id: 'tm1',
    name: 'Prof. Dr. Hem Raj Pant',
    role: 'Vice Chancellor',
    imageUrl: '/images/team/vice-chancellor.jpg',
    bio: 'Leading the university with a vision for academic excellence and innovation.',
    linkedin: 'https://linkedin.com/in/hemrajpant',
    email: 'vc@fwu.edu.np'
  },
  {
    id: 'tm2',
    name: 'Prof. Dr. Narendra Singh Dhami',
    role: 'Registrar',
    imageUrl: '/images/team/registrar.jpg',
    bio: 'Overseeing administrative functions and institutional operations.',
    linkedin: 'https://linkedin.com/in/narendradhami',
    email: 'registrar@fwu.edu.np'
  },
  {
    id: 'tm3',
    name: 'Prof. Dr. Santosh Thapa',
    role: 'Dean of Academic Affairs',
    imageUrl: '/images/team/dean-academic.jpg',
    bio: 'Coordinating academic programs and ensuring educational quality.',
    twitter: 'https://twitter.com/santoshthapa',
    email: 'academic@fwu.edu.np'
  },
  {
    id: 'tm4',
    name: 'Dr. Ramesh Joshi',
    role: 'Director of Research',
    imageUrl: '/images/team/research-director.jpg',
    bio: 'Leading research initiatives and fostering innovation across disciplines.',
    email: 'research@fwu.edu.np'
  },
];

const TeamSection = () => {
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
    <section ref={sectionRef} className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #4a90e2 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-teal-200 rounded-full opacity-20 blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <SectionTitle title="University Leadership" subtitle="Guiding Excellence" />
          <p className="text-center text-gray-700 max-w-3xl mx-auto mb-12">
            Our dedicated leadership team brings together decades of academic and administrative experience
            to guide Far Western University toward its vision of excellence in education and research.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembersData.map((member, index) => (
            <div
              key={member.id}
              className={`transform transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <TeamMemberCard member={member} />
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className={`mt-16 text-center transition-all duration-700 delay-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block bg-white p-6 rounded-xl shadow-lg border border-blue-100 hover:border-blue-300 transition-all duration-300">
            <h3 className="text-xl font-bold text-blue-900 mb-2">Join Our Academic Community</h3>
            <p className="text-gray-700 mb-4">
              Far Western University welcomes talented faculty and staff to join our mission of educational excellence.
            </p>
            <a
              href="/careers"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-6 rounded-md hover:shadow-lg transition-all duration-300"
            >
              Explore Opportunities
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;