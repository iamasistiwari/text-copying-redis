// app/api/notes/route.ts
import { NextResponse } from 'next/server';
import redis from '@/lib/redis';

export async function GET() {
  const keys = await redis.keys('note:*');

  const notes: { date: string; time: string; text: string }[] = [];

  for (const key of keys) {
    const text = await redis.get(key);
    const timestamp = key.split(':')[1];
    const dateObj = new Date(Number(timestamp));

    notes.push({
      date: dateObj.toISOString().split('T')[0],
      time: dateObj.toLocaleTimeString(),
      text: text || '',
    });
  }

  // Group by date
  const grouped: Record<string, { time: string; text: string }[]> = {};
  for (const note of notes) {
    if (!grouped[note.date]) grouped[note.date] = [];
    grouped[note.date].push({ time: note.time, text: note.text });
  }

  return NextResponse.json(grouped);
}
