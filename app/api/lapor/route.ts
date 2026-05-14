import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { vibration, status } = body;

    if (vibration === undefined || status === undefined) {
      return NextResponse.json(
        { error: 'Payload harus berisi vibration dan status' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('leakdetektor')
      .insert([{ vibration, status }]);

    if (error) {
      console.error('Supabase insert error:', error);
      throw error;
    }

    return NextResponse.json(
      { message: 'Berhasil simpan ke Supabase!' },
      { status: 201 }
    );
  } catch (err: any) {
    console.error('POST /api/lapor error:', err?.message ?? err);
    return NextResponse.json(
      { error: err?.message ?? 'Terjadi kesalahan saat menyimpan data' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('leakdetektor')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) {
      console.error('Supabase select error:', error);
      throw error;
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (err: any) {
    console.error('GET /api/lapor error:', err?.message ?? err);
    return NextResponse.json(
      { error: err?.message ?? 'Gagal mengambil data' },
      { status: 500 }
    );
  }
}
