import { SupabaseClient } from '@supabase/supabase-js'

import { uploadImage } from '../common/uploadImage'

type Params = {
  shopId: string
  imageFile: File
}
export async function updateShopImageUrl(
  supabase: SupabaseClient,
  { shopId, imageFile }: Params,
): Promise<{ data: { imageUrl: string } }> {
  if (process.env.USE_MOCK_DATA === 'true') {
    const { getMockImageDataUri } = await import('@/utils/mock')
    return { data: { imageUrl: getMockImageDataUri() } }
  }

  const {
    data: { imageUrl },
  } = await uploadImage(supabase, imageFile)

  const { error } = await supabase
    .from('shops')
    .update({ image_url: imageUrl })
    .eq('id', shopId)

  if (error) {
    throw error
  }

  return { data: { imageUrl } }
}
