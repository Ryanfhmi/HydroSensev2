import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Inisialisasi Supabase di luar fungsi
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Data masuk dari ESP32:', body);

    // Ambil data dengan fallback supaya tidak undefined
    const vibration = body.vibration || body.nilai || 0;
    const status = body.status || 'KOSONG';

    const { error } = await supabase
      .from('leakdetektor')
      .insert([{ vibration: Number(vibration), status: status }]);

    if (error) throw error;

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (err: any) {
    console.error('Error API:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('leakdetektor')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) throw error;
    return NextResponse.json(data || []);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
