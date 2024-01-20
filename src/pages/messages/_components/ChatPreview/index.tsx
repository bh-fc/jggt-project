type Props = {
  chatRoomId: string
  shopId: string
}

export default function ChatPreview({ chatRoomId, shopId }: Props) {
  // 비동기로 데이터 불러오기 처리
  return <div> {shopId} </div>
}
