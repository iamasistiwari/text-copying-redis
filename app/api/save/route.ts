// app/api/save/route.ts
import { NextResponse } from 'next/server';
import redis from '@/lib/redis';

export async function POST(req: Request) {
  const body = await req.json();
  const value = body.text;

  const timestamp = Date.now().toString();

  await redis.set(`note:${timestamp}`, value);

  return NextResponse.json({ success: true, key: `note:${timestamp}` });
}
