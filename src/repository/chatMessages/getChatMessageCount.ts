export default async function getChatMessageCount(
  chatRoomId: string,
): Promise<{ data: number }> {
  return Promise.resolve({ data: 100 })
}
