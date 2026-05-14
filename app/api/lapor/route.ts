import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// 1. TAMBAHKAN INI: Supaya Vercel tidak error saat Build
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    // Inisialisasi di DALAM fungsi agar tidak error saat build
    const supabaseUrl = process.env.SUPABASE_URL!;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const body = await req.json();
    console.log('Data masuk:', body);

    // Gunakan vibration (prioritas) atau nilai (cadangan)
    const vibrationValue = body.vibration !== undefined ? body.vibration : body.nilai;
    const statusValue = body.status || 'KOSONG';

    const { error } = await supabase
      .from('leakdetektor')
      .insert([{
        vibration: Number(vibrationValue),
        status: statusValue,
      }]);

    if (error) throw error;

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    console.error('API Error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const supabaseUrl = process.env.SUPABASE_URL!;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { data, error } = await supabase
      .from('leakdetektor')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) throw error;
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
