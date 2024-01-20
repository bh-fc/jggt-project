export async function getMe(): Promise<{ data: { shopId: string | null } }> {
  return Promise.resolve({ data: { shopId: 'mock-shop-id' } })
}
