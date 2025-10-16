// Project-related interfaces
export interface ProjectData {
  id?: string;
  title: string;
  subtitle: string;
  period: string;
  description: string;
  technologies: string[];
  achievements: string[];
  projectUrl?: string;
  githubUrl?: string;
}

// Admin interface
export interface Admin {
  id?: string;
  username: string;
  email: string;
  password?: string;
  role?: "admin";
}

// Experience interface
export interface ExperienceData {
  id?: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  imageUrl: string;
  achievements: string[];
  order?: number;
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
}


// Skill interface
export interface Skill {
  id?: string;
  name: string;
  level?: string;
  category?: string;
}
