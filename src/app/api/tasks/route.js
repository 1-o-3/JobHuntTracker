import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

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
    const data = await request.json();
    
    // Convert 'date' string to Date object if valid, otherwise null
    if (data.date) data.date = new Date(data.date);
    else data.date = null;

    if (data.deadline) data.deadline = new Date(data.deadline);
    else data.deadline = null;

    const newTask = await prisma.task.create({
      data: {
        ...data,
        userId: session.user.id,
      }
    });
    
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}
