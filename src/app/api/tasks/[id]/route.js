import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await request.json();
    const id = params.id;

    // Convert 'date' string to Date object if valid, otherwise null
    if (data.date) data.date = new Date(data.date);
    else data.date = null;

    if (data.deadline) data.deadline = new Date(data.deadline);
    else data.deadline = null;

    // Verify ownership
    const existing = await prisma.task.findUnique({ where: { id } });
    if (!existing || existing.userId !== session.user.id) {
      return NextResponse.json({ error: "Not found or forbidden" }, { status: 403 });
    }

    // Strip id and userId from update payload securely
    delete data.id;
    delete data.userId;
    delete data.createdAt;
    delete data.updatedAt;

    const updatedTask = await prisma.task.update({
      where: { id },
      data
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const id = params.id;

    // Verify ownership
    const existing = await prisma.task.findUnique({ where: { id } });
    if (!existing || existing.userId !== session.user.id) {
      return NextResponse.json({ error: "Not found or forbidden" }, { status: 403 });
    }

    await prisma.task.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
  }
}
