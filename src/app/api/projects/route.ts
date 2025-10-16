import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const project = await prisma.project.findUnique({ where: { id } });
    return NextResponse.json({ success: true, data: project });
  }

  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json({ success: true, data: projects });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const project = await prisma.project.create({ data: body });
  return NextResponse.json({ success: true, data: project });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  if (!body.id)
    return NextResponse.json({ success: false, error: "No ID provided" });

  const project = await prisma.project.update({
    where: { id: body.id },
    data: body,
  });
  return NextResponse.json({ success: true, data: project });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id)
    return NextResponse.json({ success: false, error: "No ID provided" });

  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
