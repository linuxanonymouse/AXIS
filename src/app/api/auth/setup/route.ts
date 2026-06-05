import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/auth';

export async function GET() {
  // Check if setup is needed
  try {
    const count = await prisma.adminUser.count();
    return NextResponse.json({ isSetupComplete: count > 0 });
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Only allow if NO admins exist
    const count = await prisma.adminUser.count();
    if (count > 0) {
      return NextResponse.json({ error: 'Setup already complete' }, { status: 403 });
    }

    const body = await request.json();
    const { email, password, name } = body;

    if (!email || !password || password.length < 8) {
      return NextResponse.json({ error: 'Valid email and password (min 8 chars) are required' }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.adminUser.create({
      data: {
        email,
        password: hashedPassword,
        name: name || 'Admin',
      },
    });

    // Auto-login
    const token = await signToken({ email: user.email, id: user.id });

    const response = NextResponse.json({ success: true }, { status: 201 });
    
    response.cookies.set('axis_admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' && process.env.REQUIRE_HTTPS === 'true',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (error) {
    console.error('Setup error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

