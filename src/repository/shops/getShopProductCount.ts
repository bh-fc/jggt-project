export async function getShopProductCount(shopId: string): Promise<{
  data: number
}> {
  return Promise.resolve({ data: 1000 })
}
