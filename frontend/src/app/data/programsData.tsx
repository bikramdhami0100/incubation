import { Laptop, Users, Rocket, GraduationCap,} from 'lucide-react';
import { Program } from '../types/program.types';

export const programsData: Program[] = [
  {
    id: 'bootcamp',
    slug: 'intensive-bootcamps',
    icon: <Laptop />,
    title: 'Intensive Bootcamps',
    shortDescription: 'Deep-dive, skill-based training programs designed to rapidly accelerate your knowledge in specific tech and business domains.',
    longDescription: 'Our intensive bootcamps are designed to transform beginners into skilled practitioners in a short period of time. Through hands-on projects, expert mentorship, and a carefully structured curriculum, participants gain practical experience and build a portfolio of work that demonstrates their capabilities.',
    bgColorClass: 'bg-gradient-to-br from-indigo-50 via-white to-purple-50',
    accentColor: 'indigo',
    category: 'bootcamp' as const,
    level: 'all-levels' as const,
    format: 'hybrid' as const,
    duration: '4-12 weeks, depending on program',
    schedule: 'Full-time (Mon-Fri, 9am-5pm) or Part-time options available',
    capacity: 25,
    location: {
      venue: 'FWU Campus',
      address: 'Far Western University Campus',
      city: 'Mahendranagar',
      country: 'Nepal',
      isOnline: true,
      isHybrid: true,
    },
    benefits: [
      'Accelerated learning in a condensed timeframe',
      'Hands-on project-based curriculum',
      'Direct mentorship from industry professionals',
      'Networking opportunities with peers and potential employers',
      'Certificate of completion recognized by industry partners'
    ],
    learningOutcomes: [
      'Master practical skills in chosen technology stack',
      'Build a professional portfolio of projects',
      'Develop problem-solving and critical thinking abilities'
    ],
    eligibilityRequirements: [
      'Basic computer literacy',
      'Commitment to full-time or part-time schedule',
      'Passion for learning and technology'
    ],
    applicationProcess: [
      'Submit application form with background information',
      'Complete technical assessment (if applicable)',
      'Interview with program coordinators',
      'Receive acceptance decision within 2 weeks',
      'Pay program fee to secure your spot'
    ],
    targetAudience: [
      'Career changers seeking new skills',
      'Recent graduates',
      'Working professionals looking to upskill'
    ],
    imageUrl: '/programs/bootcamp-hero.jpg',
    heroImageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop',
    upcomingDates: [
      {
        date: 'January 15, 2025',
        title: 'Web Development Bootcamp',
        description: 'Learn modern web development with React and Node.js',
        capacity: 25,
        status: 'upcoming' as const
      },
      {
        date: 'March 1, 2025',
        title: 'Data Science Fundamentals',
        description: 'Master data analysis and machine learning basics',
        capacity: 20,
        status: 'upcoming' as const
      },
      {
        date: 'May 10, 2025',
        title: 'Mobile App Development',
        description: 'Build cross-platform mobile applications',
        capacity: 20,
        status: 'upcoming' as const
      }
    ],
    tags: ['technology', 'skills', 'career', 'intensive'],
    featured: true,
    status: 'active' as const,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-11-01T00:00:00Z'
  },
  {
    id: 'hackathon',
    slug: 'innovation-hackathons',
    icon: <Users />,
    title: 'Innovation Hackathons',
    shortDescription: 'High-energy, collaborative events where participants team up to solve real-world challenges and build innovative prototypes within a limited timeframe.',
    longDescription: 'Our hackathons bring together diverse talents to tackle real-world challenges in an intense, collaborative environment. Participants form cross-functional teams and work against the clock to develop innovative solutions, which are then presented to a panel of judges from industry and academia.',
    bgColorClass: 'bg-gradient-to-br from-teal-50 via-white to-cyan-50',
    accentColor: 'teal',
    category: 'hackathon' as const,
    level: 'all-levels' as const,
    format: 'in-person' as const,
    duration: '24-48 hours (weekend events)',
    schedule: 'Quarterly events throughout the year',
    capacity: 100,
    location: {
      venue: 'FWU Innovation Hub',
      address: 'Far Western University Innovation Hub',
      city: 'Mahendranagar',
      country: 'Nepal',
      isOnline: false,
      isHybrid: false,
    },
    benefits: [
      'Develop rapid problem-solving and prototyping skills',
      'Build your network with like-minded innovators',
      'Gain exposure to industry challenges and opportunities',
      'Win prizes and potential funding for your ideas',
      'Receive feedback from industry experts and potential users'
    ],
    learningOutcomes: [
      'Master rapid prototyping techniques',
      'Develop teamwork and collaboration skills',
      'Learn to work under pressure and tight deadlines'
    ],
    eligibilityRequirements: [
      'Open to all skill levels',
      'Team formation encouraged but not required',
      'Commitment to full event participation'
    ],
    applicationProcess: [
      'Register individually or as a team (2-5 members)',
      'Submit your background and areas of expertise',
      'Receive confirmation and pre-event materials',
      'Attend optional pre-hackathon workshops'
    ],
    targetAudience: [
      'Developers and designers',
      'Entrepreneurs and innovators',
      'Students and professionals',
      'Anyone passionate about problem-solving'
    ],
    imageUrl: '/programs/hackathon-hero.jpg',
    heroImageUrl: 'https://images.unsplash.com/photo-1591115765373-5207764f72e4?q=80&w=1200&auto=format&fit=crop',
    upcomingDates: [
      {
        date: 'December 12-14, 2024',
        title: 'FinTech Hackathon Challenge',
        description: 'Build innovative financial technology solutions',
        capacity: 100,
        status: 'upcoming' as const
      },
      {
        date: 'February 20-22, 2025',
        title: 'HealthTech Innovation Weekend',
        description: 'Create healthcare technology solutions',
        capacity: 80,
        status: 'upcoming' as const
      },
      {
        date: 'April 15-17, 2025',
        title: 'Sustainability Solutions Hackathon',
        description: 'Develop sustainable technology solutions',
        capacity: 100,
        status: 'upcoming' as const
      }
    ],
    tags: ['innovation', 'collaboration', 'competition', 'prototyping'],
    featured: true,
    status: 'active' as const,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-11-01T00:00:00Z'
  },
  {
    id: 'demoday',
    slug: 'startup-demo-days',
    icon: <Rocket />,
    title: 'Startup Demo Days',
    shortDescription: 'An exclusive platform for our incubated startups to pitch their ventures to investors, industry leaders, and potential partners.',
    longDescription: 'Demo Days are the culmination of our incubation programs, where startups showcase their progress and pitch to a curated audience of investors, industry partners, and media. These high-visibility events provide startups with the opportunity to secure funding, partnerships, and media coverage.',
    bgColorClass: 'bg-gradient-to-br from-amber-50 via-white to-orange-50',
    accentColor: 'amber',
    category: 'demo-day' as const,
    level: 'advanced' as const,
    format: 'hybrid' as const,
    duration: '1 full day event',
    schedule: 'Bi-annual (Spring and Fall)',
    capacity: 15,
    location: {
      venue: 'FWU Auditorium',
      address: 'Far Western University Main Campus',
      city: 'Mahendranagar',
      country: 'Nepal',
      isOnline: true,
      isHybrid: true,
    },
    benefits: [
      'Pitch to a curated audience of investors and partners',
      'Receive professional pitch coaching and preparation',
      'Network with potential investors and strategic partners',
      'Media exposure and PR opportunities',
      'Post-event introductions to interested stakeholders'
    ],
    learningOutcomes: [
      'Master the art of startup pitching',
      'Develop investor presentation skills',
      'Learn to handle Q&A sessions effectively'
    ],
    eligibilityRequirements: [
      'Must be enrolled in FWU Incubation programs',
      'Startup must meet readiness criteria',
      'Completed pitch preparation workshops'
    ],
    applicationProcess: [
      'Only open to startups in FWU Incubation programs',
      'Selection based on readiness and progress metrics',
      'Mandatory pitch preparation workshops',
      'Final selection by incubation program directors'
    ],
    targetAudience: [
      'Incubated startup founders',
      'Startup teams ready for investment',
      'Entrepreneurs seeking funding'
    ],
    imageUrl: '/programs/demoday-hero.jpg',
    heroImageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1200&auto=format&fit=crop',
    upcomingDates: [
      {
        date: 'November 30, 2024',
        title: 'Fall 2024 Demo Day',
        description: 'Showcase your startup to investors and partners',
        capacity: 15,
        status: 'upcoming' as const
      },
      {
        date: 'May 25, 2025',
        title: 'Spring 2025 Demo Day',
        description: 'Present your venture to the investment community',
        capacity: 15,
        status: 'upcoming' as const
      }
    ],
    tags: ['pitching', 'investment', 'networking', 'showcase'],
    featured: true,
    status: 'active' as const,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-11-01T00:00:00Z'
  },
  {
    id: 'workshops',
    slug: 'expert-workshops',
    icon: <GraduationCap />,
    title: 'Expert Workshops',
    shortDescription: 'Focused sessions led by industry experts on crucial topics like marketing, finance, legal aspects, and technology trends.',
    longDescription: 'Our expert workshops provide targeted knowledge and skills development in specific areas critical to startup success. Led by industry practitioners and subject matter experts, these sessions combine theoretical frameworks with practical applications.',
    bgColorClass: 'bg-gradient-to-br from-pink-50 via-white to-rose-50',
    accentColor: 'pink',
    category: 'workshop' as const,
    level: 'all-levels' as const,
    format: 'hybrid' as const,
    duration: '2-4 hours per workshop',
    schedule: 'Monthly workshops on rotating topics',
    capacity: 40,
    location: {
      venue: 'FWU Incubation Center',
      address: 'Far Western University Incubation Center',
      city: 'Mahendranagar',
      country: 'Nepal',
      isOnline: true,
      isHybrid: true,
    },
    benefits: [
      'Learn practical skills directly applicable to your business',
      'Access to industry experts and their networks',
      'Receive personalized feedback on your specific challenges',
      'Connect with peers facing similar challenges',
      'Take home actionable templates and resources'
    ],
    learningOutcomes: [
      'Gain practical business skills',
      'Develop industry-specific knowledge',
      'Build professional networks'
    ],
    eligibilityRequirements: [
      'Open to all entrepreneurs',
      'Some workshops may have prerequisites',
      'Registration required'
    ],
    applicationProcess: [
      'Open to all entrepreneurs and startup team members',
      'Registration required, with priority for FWU incubated startups',
      'Some advanced workshops may have prerequisites'
    ],
    targetAudience: [
      'Entrepreneurs and startup founders',
      'Business professionals',
      'Students interested in entrepreneurship'
    ],
    imageUrl: '/programs/workshop-hero.jpg',
    heroImageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1200&auto=format&fit=crop',
    upcomingDates: [
      {
        date: 'November 15, 2024',
        title: 'Design Thinking Workshop for Innovators',
        description: 'Learn human-centered design principles',
        capacity: 40,
        status: 'upcoming' as const
      },
      {
        date: 'January 10, 2025',
        title: 'Funding Strategies for Early-Stage Startups',
        description: 'Master the art of raising capital',
        capacity: 30,
        status: 'upcoming' as const
      },
      {
        date: 'February 5, 2025',
        title: 'Digital Marketing Essentials',
        description: 'Build effective digital marketing strategies',
        capacity: 40,
        status: 'upcoming' as const
      },
      {
        date: 'March 12, 2025',
        title: 'Legal Fundamentals for Startups',
        description: 'Navigate legal requirements for startups',
        capacity: 35,
        status: 'upcoming' as const
      }
    ],
    tags: ['education', 'skills', 'networking', 'business'],
    featured: false,
    status: 'active' as const,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-11-01T00:00:00Z'
  },
];
