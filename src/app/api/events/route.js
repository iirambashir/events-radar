import { connectDB } from '@/lib/db';
import Event from '@/models/Event';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') || '3days';
    
    const now = new Date();
    let filter = {};
    
    switch (range) {
      case '3days':
        const threeDays = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
        filter = { date: { $gte: now, $lte: threeDays } };
        break;
      case 'week':
        const oneWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        filter = { date: { $gte: now, $lte: oneWeek } };
        break;
      case 'month':
        const oneMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
        filter = { date: { $gte: now, $lte: oneMonth } };
        break;
      case 'past':
        filter = { date: { $lt: now } };
        break;
      default:
        filter = { date: { $gte: now } };
    }
    
    const events = await Event.find(filter)
      .sort({ date: 1 })
      .limit(100);
    
    return NextResponse.json({
      success: true,
      count: events.length,
      events
    });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}