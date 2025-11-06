import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const skill = await prisma.skill.findUnique({ where: { id } });
    return NextResponse.json({ success: true, data: skill });
  }

  const skills = await prisma.skill.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json({ success: true, data: skills });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const skill = await prisma.skill.create({ data: body });
  return NextResponse.json({ success: true, data: skill });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  if (!body.id)
    return NextResponse.json({ success: false, error: "No ID provided" });

  const skill = await prisma.skill.update({
    where: { id: body.id },
    data: body,
  });
  return NextResponse.json({ success: true, data: skill });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id)
    return NextResponse.json({ success: false, error: "No ID provided" });

  await prisma.skill.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
