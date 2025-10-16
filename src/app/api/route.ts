// Example: src/app/api/projects/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "@/lib/apis";

export async function GET() {
  const projects = await getProjects();
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const project = await createProject(data);
  return NextResponse.json(project);
}

export async function PATCH(req: NextRequest) {
  const { id, ...data } = await req.json();
  const project = await updateProject(id, data);
  return NextResponse.json(project);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await deleteProject(id);
  return NextResponse.json({ success: true });
}
