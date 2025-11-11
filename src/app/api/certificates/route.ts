import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const certificate = await prisma.certificate.findUnique({
        where: { id },
      });
      return NextResponse.json({ success: true, data: certificate });
    }

    const certificates = await prisma.certificate.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: certificates });
  } catch (error) {
    console.error("Certificate API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch certificates" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const certificate = await prisma.certificate.create({ data: body });
    return NextResponse.json({ success: true, data: certificate });
  } catch (error) {
    console.error("Certificate POST Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create certificate" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.id)
      return NextResponse.json({ success: false, error: "No ID provided" });

    const certificate = await prisma.certificate.update({
      where: { id: body.id },
      data: body,
    });
    return NextResponse.json({ success: true, data: certificate });
  } catch (error) {
    console.error("Certificate PUT Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update certificate" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id)
      return NextResponse.json({ success: false, error: "No ID provided" });

    await prisma.certificate.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Certificate DELETE Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete certificate" },
      { status: 500 }
    );
  }
}
