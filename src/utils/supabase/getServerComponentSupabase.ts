import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

import { supabaseKey, supabaseUrl } from '../constants'

function getServerComponentSuapbase(cookieStore: ReturnType<typeof cookies>) {
  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
    },
  })

  return supabase
}

export default getServerComponentSuapbase
