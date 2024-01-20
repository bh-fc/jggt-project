import { createBrowserClient } from '@supabase/ssr'

import { supabaseUrl, supabaseKey } from '../constants'

const supabase = createBrowserClient(supabaseUrl, supabaseKey)

export default supabase
