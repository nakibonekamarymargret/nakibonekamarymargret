import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const experience = await prisma.experience.findUnique({ where: { id } });
    return NextResponse.json({ success: true, data: experience });
  }

const experiences = await prisma.experience.findMany({
  orderBy: { priority: "asc" },
});  return NextResponse.json({ success: true, data: experiences });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const experience = await prisma.experience.create({ data: body });
  return NextResponse.json({ success: true, data: experience });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  if (!body.id)
    return NextResponse.json({ success: false, error: "No ID provided" });

  const experience = await prisma.experience.update({
    where: { id: body.id },
    data: body,
  });
  return NextResponse.json({ success: true, data: experience });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id)
    return NextResponse.json({ success: false, error: "No ID provided" });

  await prisma.experience.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
