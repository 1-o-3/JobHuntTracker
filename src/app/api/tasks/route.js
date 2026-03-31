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

export async function GET(request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const tasks = await prisma.task.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(tasks);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const raw = await request.json();
    const data = sanitizeTaskData(raw);

    const newTask = await prisma.task.create({
      data: {
        ...data,
        userId: session.user.id,
      }
    });
    
    console.log("Task created successfully:", newTask.id);
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error("API POST Error:", error);
    return NextResponse.json({ error: "Failed to create task", detail: error.message }, { status: 500 });
  }
}
