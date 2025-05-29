import { NextResponse } from 'next/server';
import { addDisasterLocation, getAllDisasterLocations, deleteDisasterLocation } from '@/services/disaster-service';
import { DisasterLocation } from '@/types/disaster';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const disaster = await addDisasterLocation(data);
    return NextResponse.json(disaster);
  } catch (error) {
    console.error('Failed to add disaster location:', error);
    return NextResponse.json(
      { error: 'Failed to add disaster location' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const disasters = await getAllDisasterLocations();
    return NextResponse.json(disasters);
  } catch (error) {
    console.error('Failed to get disaster locations:', error);
    return NextResponse.json(
      { error: 'Failed to get disaster locations' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const success = await deleteDisasterLocation(id);
    if (!success) {
      return NextResponse.json(
        { error: 'Disaster location not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete disaster location:', error);
    return NextResponse.json(
      { error: 'Failed to delete disaster location' },
      { status: 500 }
    );
  }
} 