import { redirect } from 'next/navigation'

export default async function Shops({
  params,
}: {
  params: { shopId: string }
}) {
  return redirect(`/shops/${params.shopId}/products`)
}
