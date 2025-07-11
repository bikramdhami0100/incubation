// TypeScript interfaces for Program-related data structures

import { ReactNode } from 'react';

// Base interface for program dates
export interface ProgramDate {
  date: string;
  title: string;
  description?: string;
  registrationDeadline?: string;
  capacity?: number;
  status?: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

// Interface for program benefits
export interface ProgramBenefit {
  id: string;
  title: string;
  description: string;
  icon?: ReactNode;
}

// Interface for application process steps
export interface ApplicationStep {
  step: number;
  title: string;
  description: string;
  required: boolean;
  estimatedTime?: string;
}

// Interface for program timeline
export interface ProgramTimeline {
  stage: string;
  date: string;
  description: string;
  status?: 'completed' | 'current' | 'upcoming';
}

// Interface for program faculty/mentors
export interface ProgramFaculty {
  id: string;
  name: string;
  title: string;
  bio: string;
  imageUrl?: string;
  expertise: string[];
  linkedIn?: string;
  twitter?: string;
}

// Interface for program curriculum modules
export interface CurriculumModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  topics: string[];
  learningOutcomes: string[];
  prerequisites?: string[];
}

// Interface for program statistics
export interface ProgramStats {
  totalParticipants?: number;
  successRate?: number;
  averageRating?: number;
  completionRate?: number;
  jobPlacementRate?: number;
  startupSuccessRate?: number;
}

// Interface for program pricing
export interface ProgramPricing {
  basePrice: number;
  currency: string;
  scholarshipAvailable: boolean;
  scholarshipPercentage?: number;
  paymentPlans?: string[];
  refundPolicy?: string;
}

// Interface for program location
export interface ProgramLocation {
  venue: string;
  address: string;
  city: string;
  country: string;
  isOnline: boolean;
  isHybrid: boolean;
  mapUrl?: string;
}

// Main Program interface
export interface Program {
  // Basic Information
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  
  // Visual Elements
  icon?: ReactNode;
  imageUrl?: string;
  heroImageUrl?: string;
  galleryImages?: string[];
  bgColorClass?: string;
  accentColor?: string;
  
  // Program Details
  category: 'bootcamp' | 'workshop' | 'hackathon' | 'demo-day' | 'mentorship' | 'accelerator';
  level: 'beginner' | 'intermediate' | 'advanced' | 'all-levels';
  format: 'in-person' | 'online' | 'hybrid';
  duration: string;
  schedule: string;
  capacity: number;
  
  // Dates and Timeline
  upcomingDates: ProgramDate[];
  applicationDeadline?: string;
  startDate?: string;
  endDate?: string;
  
  // Educational Content
  benefits: string[];
  curriculum?: CurriculumModule[];
  learningOutcomes: string[];
  prerequisites?: string[];
  
  // Application and Eligibility
  eligibilityRequirements: string[];
  applicationProcess: string[] | ApplicationStep[];
  applicationTimeline?: ProgramTimeline[];
  
  // People
  faculty?: ProgramFaculty[];
  mentors?: ProgramFaculty[];
  targetAudience: string[];
  
  // Location and Logistics
  location: ProgramLocation;
  
  // Pricing and Financial
  pricing?: ProgramPricing;
  scholarships?: string[];
  
  // Performance Metrics
  stats?: ProgramStats;
  
  // Additional Information
  tags: string[];
  featured: boolean;
  status: 'active' | 'inactive' | 'coming-soon' | 'archived';
  
  // SEO and Marketing
  metaDescription?: string;
  keywords?: string[];
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
}

// Interface for program filters
export interface ProgramFilters {
  category?: string[];
  level?: string[];
  format?: string[];
  duration?: string[];
  status?: string[];
  featured?: boolean;
}

// Interface for program search
export interface ProgramSearchParams {
  query?: string;
  filters?: ProgramFilters;
  sortBy?: 'title' | 'date' | 'popularity' | 'rating';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

// Interface for program card props
export interface ProgramCardProps {
  program: Program;
  variant?: 'default' | 'featured' | 'compact';
  showImage?: boolean;
  showStats?: boolean;
  className?: string;
}

// Interface for program page props
export interface ProgramPageProps {
  program: Program;
  relatedPrograms?: Program[];
  testimonials?: [];
}

// Interface for programs list response
export interface ProgramsResponse {
  programs: Program[];
  total: number;
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}


