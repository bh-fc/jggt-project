import { useState } from 'react'

export default function Search() {
  const [search, setSearch] = useState('')

  return (
    <div className="w-96 border-2 border-red-500 px-4 py-2">
      <form className="flex justify-between">
        <input
          className="w-full text-sm font-light outline-0"
          type="text"
          placeholder="상품명, 상점명 입력"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="flex justify-center items-center">
          <span className="material-symbols-outlined">search</span>
        </button>
      </form>
    </div>
  )
}
