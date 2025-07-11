// components/about/TeamMemberCard.tsx
import Image from 'next/image';
import { Linkedin, Twitter, Mail, Quote } from 'lucide-react';

export interface Member {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  bio?: string; // Optional short bio
  linkedin?: string;
  twitter?: string;
  email?: string;
}

interface TeamMemberCardProps {
  member: Member;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 hover:shadow-2xl transition-all duration-500 flex flex-col items-center h-full border border-gray-100 hover:border-blue-200 relative group overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500" style={{
        backgroundImage: 'radial-gradient(circle, #4a90e2 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}></div>

      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
        <div className="absolute transform rotate-45 bg-blue-600 w-16 h-3 -top-2 -right-8 opacity-70"></div>
      </div>

      {/* Profile Image with Glow Effect */}
      <div className="relative w-32 h-32 md:w-40 md:h-40 mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:shadow-blue-200 transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white"></div>
        <Image
          src={member.imageUrl}
          alt={member.name}
          width={160}
          height={160}
          className="relative z-10 object-cover"
        />
        <div className="absolute inset-0 bg-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Name and Role */}
      <h3 className="text-xl md:text-2xl font-bold text-blue-900 mb-1 group-hover:text-blue-700 transition-colors duration-300">{member.name}</h3>
      <p className="text-blue-600 font-medium mb-4 px-2">{member.role}</p>

      {/* Bio with Quote Icon */}
      {member.bio && (
        <div className="relative text-sm text-gray-600 mb-6 px-2 flex-grow">
          <Quote className="text-blue-100 absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 opacity-50" />
          <p className="relative z-10">{member.bio}</p>
        </div>
      )}

      {/* Social Links with Enhanced Styling */}
      {(member.linkedin || member.twitter || member.email) && (
        <div className="flex space-x-4 mt-auto pt-4 border-t border-gray-200 w-full justify-center">
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-600 transition-colors duration-300 transform hover:scale-110"
              aria-label={`LinkedIn profile of ${member.name}`}
            >
              <Linkedin size={22} />
            </a>
          )}
          {member.twitter && (
            <a
              href={member.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
              aria-label={`Twitter profile of ${member.name}`}
            >
              <Twitter size={22} />
            </a>
          )}
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="text-gray-400 hover:text-teal-500 transition-colors duration-300 transform hover:scale-110"
              aria-label={`Email ${member.name}`}
            >
              <Mail size={22} />
            </a>
          )}
        </div>
      )}

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-50 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
    </div>
  );
};

export default TeamMemberCard;