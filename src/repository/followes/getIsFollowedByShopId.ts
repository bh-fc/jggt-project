type Params = {
  followerId: string
  followedId: string
}

export async function getIsFollowedByShopId({
  followerId,
  followedId,
}: Params): Promise<{ data: boolean }> {
  return Promise.resolve({ data: true })
}
