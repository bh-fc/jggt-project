import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gtbjowyqijdkucabgugs.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0Ympvd3lxaWpka3VjYWJndWdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQyOTk4MjIsImV4cCI6MjAxOTg3NTgyMn0.v3LH5oEa_G9_lAeDnT8AawENZPmEJRtEvQZ2dPf5Sjs'

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
