import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return Response.json({ error: 'Email required' }, { status: 400 });
    }

    const { error } = await supabase
      .from('waitlist')
      .insert([{ email }]);

    if (error) {
      // Email déjà existant
      if (error.code === '23505') {
        return Response.json({ success: true, message: 'already_registered' });
      }
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}