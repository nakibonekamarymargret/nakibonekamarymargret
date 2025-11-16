import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const experience = await prisma.experience.findUnique({ where: { id } });
      return NextResponse.json({ success: true, data: experience });
    }

    const experiences = await prisma.experience.findMany({
      orderBy: [
        { isCurrent: "desc" },
        { featured: "desc" },
        { priority: "desc" },
        { createdAt: "desc" },
      ],
    });
    return NextResponse.json({ success: true, data: experiences });
  } catch (error) {
    console.error("GET /api/experiences error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch experiences",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Clean up the data - remove undefined values and ensure arrays
    const cleanData = {
      title: body.title || "",
      company: body.company || "",
      companyUrl: body.companyUrl || null,
      location: body.location || null,
      employmentType: body.employmentType || null,
      startDate: body.startDate || "",
      endDate: body.endDate || "",
      isCurrent: Boolean(body.isCurrent),
      imageUrl: body.imageUrl || null,
      companySize: body.companySize || null,
      industry: body.industry || null,
      description: body.description || "",
      achievements: Array.isArray(body.achievements)
        ? body.achievements.filter(Boolean)
        : [],
      technologies: Array.isArray(body.technologies)
        ? body.technologies.filter(Boolean)
        : [],
      responsibilities: Array.isArray(body.responsibilities)
        ? body.responsibilities.filter(Boolean)
        : [],
      metrics: Array.isArray(body.metrics) ? body.metrics.filter(Boolean) : [],
      projects: Array.isArray(body.projects)
        ? body.projects.filter(Boolean)
        : [],
      skillsGained: Array.isArray(body.skillsGained)
        ? body.skillsGained.filter(Boolean)
        : [],
      featured: Boolean(body.featured),
      priority: Number(body.priority) || 0,
      published: body.published !== undefined ? Boolean(body.published) : true,
    };

    const experience = await prisma.experience.create({ data: cleanData });
    return NextResponse.json({ success: true, data: experience });
  } catch (error) {
    console.error("POST /api/experiences error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to create experience",
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.id) {
      return NextResponse.json(
        { success: false, error: "No ID provided" },
        { status: 400 }
      );
    }

    const { id, createdAt, updatedAt, ...data } = body;

    // Clean up the data
    const cleanData = {
      title: data.title || undefined,
      company: data.company || undefined,
      companyUrl: data.companyUrl !== undefined ? data.companyUrl : undefined,
      location: data.location !== undefined ? data.location : undefined,
      employmentType:
        data.employmentType !== undefined ? data.employmentType : undefined,
      startDate: data.startDate || undefined,
      endDate: data.endDate || undefined,
      isCurrent:
        data.isCurrent !== undefined ? Boolean(data.isCurrent) : undefined,
      imageUrl: data.imageUrl !== undefined ? data.imageUrl : undefined,
      companySize:
        data.companySize !== undefined ? data.companySize : undefined,
      industry: data.industry !== undefined ? data.industry : undefined,
      description: data.description || undefined,
      achievements: Array.isArray(data.achievements)
        ? data.achievements.filter(Boolean)
        : undefined,
      technologies: Array.isArray(data.technologies)
        ? data.technologies.filter(Boolean)
        : undefined,
      responsibilities: Array.isArray(data.responsibilities)
        ? data.responsibilities.filter(Boolean)
        : undefined,
      metrics: Array.isArray(data.metrics)
        ? data.metrics.filter(Boolean)
        : undefined,
      projects: Array.isArray(data.projects)
        ? data.projects.filter(Boolean)
        : undefined,
      skillsGained: Array.isArray(data.skillsGained)
        ? data.skillsGained.filter(Boolean)
        : undefined,
      featured:
        data.featured !== undefined ? Boolean(data.featured) : undefined,
      priority: data.priority !== undefined ? Number(data.priority) : undefined,
      published:
        data.published !== undefined ? Boolean(data.published) : undefined,
    };

    // Remove undefined values
    Object.keys(cleanData).forEach(
      (key) =>
        cleanData[key as keyof typeof cleanData] === undefined &&
        delete cleanData[key as keyof typeof cleanData]
    );

    const experience = await prisma.experience.update({
      where: { id },
      data: cleanData,
    });

    return NextResponse.json({ success: true, data: experience });
  } catch (error) {
    console.error("PUT /api/experiences error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to update experience",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "No ID provided" },
        { status: 400 }
      );
    }

    await prisma.experience.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/experiences error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to delete experience",
      },
      { status: 500 }
    );
  }
}
