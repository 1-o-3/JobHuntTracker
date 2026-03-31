import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

// GET /api/settings  → load user settings from DB
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { settings: true },
  });

  return NextResponse.json(user?.settings || {});
}

// PUT /api/settings  → save (merge) user settings to DB
export async function PUT(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();

  // Load existing settings first, then merge
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { settings: true },
  });

  const merged = { ...(user?.settings || {}), ...body };

  const updated = await prisma.user.update({
    where: { id: session.user.id },
    data: { settings: merged },
    select: { settings: true },
  });

  return NextResponse.json(updated.settings);
}
