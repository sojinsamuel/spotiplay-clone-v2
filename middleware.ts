import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from 'next/server'

// This middleware is used to check if the user is logged in
export async function middleware(req: NextRequest) {
   const res = NextResponse.next()
   const supabase = createMiddlewareClient({ req, res })

   await supabase.auth.getSession()
   return res
}
