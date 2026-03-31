import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

// Only pick fields that exist in the Prisma Task schema
function sanitizeTaskData(data) {
  const allowed = [
    'title', 'category', 'companyName', 'date', 'time', 'endTime',
    'duration', 'location', 'zoomLink', 'applySite', 'dressCode',
    'belongings', 'deadline', 'todoList', 'links', 'memo', 'color',
    'calendarName', 'icon', 'displayFormat', 'zoomId', 'zoomPassword',
    'repeatGroupId'
  ];

  const clean = {};
  for (const key of allowed) {
    if (key in data) {
      clean[key] = data[key];
    }
  }

  // Type coercions - only if the field was actually in the request
  if ('date' in clean) {
    if (clean.date) {
      const d = new Date(clean.date);
      clean.date = isNaN(d.getTime()) ? null : d;
    } else {
      clean.date = null;
    }
  }

  if ('deadline' in clean) {
    if (clean.deadline) {
      const d = new Date(clean.deadline);
      clean.deadline = isNaN(d.getTime()) ? null : d;
    } else {
      clean.deadline = null;
    }
  }

  // duration must be Int or null
  if ('duration' in clean) {
    const n = parseInt(clean.duration);
    clean.duration = isNaN(n) ? null : n;
  }

  return clean;
}

export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const raw = await request.json();
    const id = params.id;

    // Verify ownership
    const existing = await prisma.task.findUnique({ where: { id } });
    if (!existing || existing.userId !== session.user.id) {
      return NextResponse.json({ error: "Not found or forbidden" }, { status: 403 });
    }

    const data = sanitizeTaskData(raw);

    const updatedTask = await prisma.task.update({
      where: { id },
      data
    });

    console.log("Task updated successfully:", updatedTask.id);
    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error("API PUT Error:", error);
    return NextResponse.json({ error: "Failed to update task", detail: error.message }, { status: 500 });
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
    console.error("API DELETE Error:", error);
    return NextResponse.json({ error: "Failed to delete task", detail: error.message }, { status: 500 });
  }
}
