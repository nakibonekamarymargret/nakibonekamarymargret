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
interface ExperienceData {
  // Basic Info
  title: string;
  company: string;
  companyUrl?: string;
  location?: string; // "Remote", "Kampala, Uganda", "Hybrid"
  employmentType?: string; // "Full-time", "Part-time", "Contract", "Freelance"

  // Dates
  startDate: string;
  endDate: string;
  isCurrent?: boolean; // Currently working here

  // Visual
  imageUrl?: string; // Company logo
  companySize?: string; // "1-10", "11-50", "51-200", "200+"
  industry?: string; // "Tech", "Finance", "Healthcare", etc.

  // Content
  description: string;
  achievements: string[];

  // Technical Details
  technologies?: string[]; // Tech stack used in this role
  responsibilities?: string[]; // Day-to-day duties

  // Impact & Metrics
  metrics?: string[]; // Quantifiable results
  projects?: string[]; // Key projects worked on

  // Skills Developed
  skillsGained?: string[]; // New skills learned

  // Display
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