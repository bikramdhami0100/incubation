export interface Application {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface Applicant {
  id: number;
  status: string; // Assuming status is a string, adjust if it's an enum or specific type
  application_id: number;
  name: string;
  email: string;
  phone: string;
  photo: string;
  members: string;
  applicants_type: 'student' | 'faculty'; // Or use a more specific enum
  created_at: string;
  updated_at: string;
  application: Application;
}

export interface PaginatedData {
  current_page: number;
  data: Applicant[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: { url: string | null; label: string; active: boolean }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface Stats {
  total: number;
  studentCount: number;
  thisMonth: number;
}

export interface StatsCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  value: string | number;
  change: number;
  color: string;
}
