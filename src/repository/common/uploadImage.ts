import { SupabaseClient } from '@supabase/supabase-js'
import { nanoid } from 'nanoid'

import { getImageUrl } from '@/utils/image'

export async function uploadImage(
  supabase: SupabaseClient,
  imageFile: File,
): Promise<{ data: { imageUrl: string } }> {
  if (process.env.USE_MOCK_DATA === 'true') {
    const { getMockImageDataUri } = await import('@/utils/mock')
    return { data: { imageUrl: getMockImageDataUri() } }
  }

  const { data, error } = await supabase.storage
    .from('jggt')
    .upload(
      `${nanoid()}.${imageFile.type === 'image/jpeg' ? 'jpeg' : 'png'}`,
      imageFile,
    )

  if (error) {
    throw error
  }

  const imageUrl = await getImageUrl(data.path)

  return { data: { imageUrl } }
}
