import {prisma} from "./prisma"
// ---------------- Projects ----------------
export const getProjects = () =>
  prisma.project.findMany({ orderBy: { order: "asc" } });
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
  prisma.experience.findMany({ orderBy: { order: "asc" } });
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
  prisma.skill.findMany({ orderBy: { category: "asc", order: "asc" } });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createSkill = (data: any) => prisma.skill.create({ data });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateSkill = (id: string, data: any) =>
  prisma.skill.update({ where: { id }, data });
export const deleteSkill = (id: string) =>
  prisma.skill.delete({ where: { id } })
  ;// ---------------- Certificates ----------------
export const getCertificate = () =>
  prisma.skill.findMany({ orderBy: { category: "asc", order: "asc" } });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createtCertificate = (data: any) => prisma.skill.create({ data });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updatetCertificate = (id: string, data: any) =>
  prisma.skill.update({ where: { id }, data });
export const deletetCertificate = (id: string) => prisma.skill.delete({ where: { id } });

// ---------------- Contacts (read-only) ----------------
export const getContacts = () =>
  prisma.contact.findMany({ orderBy: { createdAt: "desc" } });
export const markContactRead = (id: string) =>
  prisma.contact.update({ where: { id }, data: { read: true } });

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
