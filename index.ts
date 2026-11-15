import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
const cors = {'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'authorization, x-client-info, apikey, content-type','Access-Control-Allow-Methods':'POST, OPTIONS'};
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', {headers:cors});
  try {
    if (req.method !== 'POST') throw new Error('Method not allowed');
    const expected = Deno.env.get('SCHOOLTRACK_ADMIN_CODE');
    const url = Deno.env.get('SUPABASE_URL');
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!expected || !url || !serviceKey) throw new Error('Admin verification is not configured.');
    const token = (req.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '');
    if (!token) throw new Error('Please start a guest session first.');
    const body = await req.json();
    if (typeof body.code !== 'string' || body.code.length < 1 || body.code.length > 128 || body.code !== expected) {
      return new Response(JSON.stringify({ok:false,error:'Admin Code was not accepted.'}), {status:401,headers:{...cors,'Content-Type':'application/json'}});
    }
    const admin = createClient(url, serviceKey, {auth:{persistSession:false}});
    const {data,error} = await admin.auth.getUser(token);
    if (error || !data.user) throw new Error('Session could not be verified. Please try again.');
    const {error:saveError} = await admin.from('admin_users').upsert({user_id:data.user.id}, {onConflict:'user_id'});
    if (saveError) throw saveError;
    return new Response(JSON.stringify({ok:true}), {headers:{...cors,'Content-Type':'application/json'}});
  } catch (e) {
    return new Response(JSON.stringify({ok:false,error:e.message || 'Admin verification failed.'}), {status:400,headers:{...cors,'Content-Type':'application/json'}});
  }
});
