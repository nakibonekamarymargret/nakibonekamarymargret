import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const project = await prisma.project.findUnique({ where: { id } });
      return NextResponse.json({ success: true, data: project });
    }

    const projects = await prisma.project.findMany({
      orderBy: [
        { featured: "desc" },
        { priority: "desc" },
        { order: "asc" },
        { createdAt: "desc" },
      ],
    });
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    console.error("GET /api/projects error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to fetch projects",
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
      subtitle: body.subtitle || "",
      period: body.period || "",
      description: body.description || "",
      thumbnailUrl: body.thumbnailUrl || null,
      videoUrl: body.videoUrl || null,
      imageUrl: body.imageUrl || null,
      technologies: Array.isArray(body.technologies)
        ? body.technologies.filter(Boolean)
        : [],
      category: body.category || null,
      role: body.role || null,
      teamSize: body.teamSize || null,
      achievements: Array.isArray(body.achievements)
        ? body.achievements.filter(Boolean)
        : [],
      metrics: Array.isArray(body.metrics) ? body.metrics.filter(Boolean) : [],
      challenges: Array.isArray(body.challenges)
        ? body.challenges.filter(Boolean)
        : [],
      screenshots: Array.isArray(body.screenshots)
        ? body.screenshots.filter(Boolean)
        : [],
      projectUrl: body.projectUrl || null,
      githubUrl: body.githubUrl || null,
      liveDemo: body.liveDemo || null,
      caseStudyUrl: body.caseStudyUrl || null,
      status: body.status || null,
      featured: Boolean(body.featured),
      priority: Number(body.priority) || 0,
      published: body.published !== undefined ? Boolean(body.published) : true,
      order: Number(body.order) || 0,
    };

    const project = await prisma.project.create({ data: cleanData });
    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    console.error("POST /api/projects error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to create project",
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

    // Clean up the data - remove undefined values and ensure arrays
    const cleanData = {
      title: data.title || undefined,
      subtitle: data.subtitle || undefined,
      period: data.period || undefined,
      description: data.description || undefined,
      thumbnailUrl:
        data.thumbnailUrl !== undefined ? data.thumbnailUrl : undefined,
      videoUrl: data.videoUrl !== undefined ? data.videoUrl : undefined,
      imageUrl: data.imageUrl !== undefined ? data.imageUrl : undefined,
      technologies: Array.isArray(data.technologies)
        ? data.technologies.filter(Boolean)
        : undefined,
      category: data.category !== undefined ? data.category : undefined,
      role: data.role !== undefined ? data.role : undefined,
      teamSize: data.teamSize !== undefined ? data.teamSize : undefined,
      achievements: Array.isArray(data.achievements)
        ? data.achievements.filter(Boolean)
        : undefined,
      metrics: Array.isArray(data.metrics)
        ? data.metrics.filter(Boolean)
        : undefined,
      challenges: Array.isArray(data.challenges)
        ? data.challenges.filter(Boolean)
        : undefined,
      screenshots: Array.isArray(data.screenshots)
        ? data.screenshots.filter(Boolean)
        : undefined,
      projectUrl: data.projectUrl !== undefined ? data.projectUrl : undefined,
      githubUrl: data.githubUrl !== undefined ? data.githubUrl : undefined,
      liveDemo: data.liveDemo !== undefined ? data.liveDemo : undefined,
      caseStudyUrl:
        data.caseStudyUrl !== undefined ? data.caseStudyUrl : undefined,
      status: data.status !== undefined ? data.status : undefined,
      featured:
        data.featured !== undefined ? Boolean(data.featured) : undefined,
      priority: data.priority !== undefined ? Number(data.priority) : undefined,
      published:
        data.published !== undefined ? Boolean(data.published) : undefined,
      order: data.order !== undefined ? Number(data.order) : undefined,
    };

    // Remove undefined values
    Object.keys(cleanData).forEach(
      (key) =>
        cleanData[key as keyof typeof cleanData] === undefined &&
        delete cleanData[key as keyof typeof cleanData]
    );

    const project = await prisma.project.update({
      where: { id },
      data: cleanData,
    });

    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    console.error("PUT /api/projects error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to update project",
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

    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/projects error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to delete project",
      },
      { status: 500 }
    );
  }
}
