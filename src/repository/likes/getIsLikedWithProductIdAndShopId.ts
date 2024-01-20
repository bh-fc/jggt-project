type Params = {
  productId: string
  shopId: string
}

export async function getIsLikedWithProductIdAndShopId({
  productId,
  shopId,
}: Params): Promise<{ data: boolean }> {
  return Promise.resolve({ data: true })
}
