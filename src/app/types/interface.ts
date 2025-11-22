// Project-related interfaces
export interface ProjectData {
  id?: string;
  title: string;
  subtitle: string;
  period: string;
  description: string;

  // Visual
  thumbnailUrl?: string;
  screenshots?: string[];
  videoUrl?: string;
  imageUrl?: string;

  // Technical
  technologies: string[];
  category?: string;
  role?: string;
  teamSize?: string;

  // Impact
  achievements: string[];
  metrics?: string[];
  challenges?: string[];

  // Links
  projectUrl?: string;
  githubUrl?: string;
  liveDemo?: string;
  caseStudyUrl?: string;

  // Display
  status?: string;
  featured?: boolean;
  priority?: number;
  order?: number;
  published?: boolean;

  createdAt?: Date;
  updatedAt?: Date;
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
  companyUrl?: string;
  location?: string;
  employmentType?: string;
  startDate: string;
  endDate: string;
  isCurrent?: boolean;
  imageUrl?: string;
  companySize?: string;
  industry?: string;
  description: string;
  achievements: string[];
  technologies?: string[];
  responsibilities?: string[];
  metrics?: string[];
  projects?: string[];
  skillsGained?: string[];
  featured?: boolean;
  priority?: number;
}

// Skill interface
export interface SkillData {
  id?: string;
  name: string;
  level?: string;
  category?: string;
}

export interface Certificates {
  id?: string;
  name: string;
  institute?: string;
  // category?: string;
}