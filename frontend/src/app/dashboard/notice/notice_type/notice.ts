// --- Type Definitions ---

export interface Admin {
  id: number;
  name: string;
  email: string;
  profile_image: string;
  role: string;
  email_verified: number;
  created_at: string;
  updated_at: string;
}

export interface NoticeItem {
  id: number;
  title: string;
  description: string;
  file?: string | null|File;
  created_at: string;
  updated_at: string;
  added_by: number;
  ended_at: string;
  description_link: string;
  admin: Admin;
}

export interface NoticeDataType {
  current_page: number;
  data: NoticeItem[];
  total: number;
  per_page: number;
  last_page: number;
}

export interface ControlsProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
}