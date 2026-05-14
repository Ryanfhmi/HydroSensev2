import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nilai, status } = body;

    console.log("Data dari ESP32:", nilai, status);

    // Di sini kamu bisa simpan ke Database (misal Supabase/MongoDB)
    
    return NextResponse.json({ 
      message: "Data Berhasil Diterima!",
      received: { nilai, status } 
    }, { status: 200 });
    
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
