import { prisma } from "./prisma";

// ---------------- Projects ----------------
export const getProjects = () =>
  prisma.project.findMany({
    orderBy: [
      { featured: "desc" }, // Featured first
      { priority: "desc" }, // Then by priority
      { order: "asc" }, // Then by order (legacy)
      { createdAt: "desc" }, // Then newest
    ],
  });

export const getProjectById = (id: string) =>
  prisma.project.findUnique({ where: { id } });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createProject = (data: any) => prisma.project.create({ data });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateProject = (id: string, data: any) =>
  prisma.project.update({ where: { id }, data });

export const deleteProject = (id: string) =>
  prisma.project.delete({ where: { id } });

// ---------------- Experiences ----------------
export const getExperiences = () =>
  prisma.experience.findMany({
    orderBy: [
      { isCurrent: "desc" }, // Current roles first
      { featured: "desc" }, // Then featured
      { priority: "desc" }, // Then by priority
      { createdAt: "desc" }, // Then newest
    ],
  });

export const getExperienceById = (id: string) =>
  prisma.experience.findUnique({ where: { id } });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createExperience = (data: any) =>
  prisma.experience.create({ data });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateExperience = (id: string, data: any) =>
  prisma.experience.update({ where: { id }, data });

export const deleteExperience = (id: string) =>
  prisma.experience.delete({ where: { id } });

// ---------------- Skills ----------------
export const getSkills = () =>
  prisma.skill.findMany({
    orderBy: [{ category: "asc" }, { order: "asc" }],
  });

export const getSkillById = (id: string) =>
  prisma.skill.findUnique({ where: { id } });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createSkill = (data: any) => prisma.skill.create({ data });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateSkill = (id: string, data: any) =>
  prisma.skill.update({ where: { id }, data });

export const deleteSkill = (id: string) =>
  prisma.skill.delete({ where: { id } });

// ---------------- Certificates ----------------
export const getCertificates = () =>
  prisma.certificate.findMany({
    orderBy: { createdAt: "desc" },
  });

export const getCertificateById = (id: string) =>
  prisma.certificate.findUnique({ where: { id } });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createCertificate = (data: any) =>
  prisma.certificate.create({ data });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateCertificate = (id: string, data: any) =>
  prisma.certificate.update({ where: { id }, data });

export const deleteCertificate = (id: string) =>
  prisma.certificate.delete({ where: { id } });

// ---------------- Contacts (read-only) ----------------
export const getContacts = () =>
  prisma.contact.findMany({ orderBy: { createdAt: "desc" } });

export const getContactById = (id: string) =>
  prisma.contact.findUnique({ where: { id } });

export const markContactRead = (id: string) =>
  prisma.contact.update({ where: { id }, data: { read: true } });

export const deleteContact = (id: string) =>
  prisma.contact.delete({ where: { id } });

// ---------------- SiteSettings (singleton) ----------------
export const getSiteSettings = () => prisma.siteSettings.findFirst();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateSiteSettings = (data: any) => {
  return prisma.siteSettings.upsert({
    where: { id: data.id || "" },
    update: data,
    create: data,
  });
};
