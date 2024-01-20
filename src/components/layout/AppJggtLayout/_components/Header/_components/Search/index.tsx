'use client'

import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import AutoComplete from './_components/AutoComplete'
import Recent from './_components/Recent'

import { addRecentKeyword } from '@/utils/localstorage'

export default function Search() {
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const shouldSearchClosed = !!ref.current?.contains(e.target as Node)
      setIsFocused(shouldSearchClosed)
    }

    window.addEventListener('click', handler)
    return () => window.removeEventListener('click', handler)
  }, [])

  return (
    <div className="relative flex-1" ref={ref}>
      <div className="w-full border-2 border-red-500 px-4 py-2">
        <form
          className="flex justify-between"
          onSubmit={(e) => {
            e.preventDefault()
            // 최근 검색어 추가
            addRecentKeyword(search)
            router.push(`/search?query=${encodeURIComponent(search)}`)
          }}
        >
          <input
            className="w-full text-sm font-light outline-0"
            type="text"
            placeholder="상품명, 상점명 입력"
            value={search}
            onFocus={() => setIsFocused(true)}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="flex justify-center items-center">
            <span className="material-symbols-outlined">search</span>
          </button>
        </form>
      </div>
      {isFocused && (
        <div
          className={classNames(
            'absolute w-full bg-white border border-grey-300 mt-2 h-96',
          )}
        >
          {search ? (
            <AutoComplete
              query={search}
              handleClose={() => setIsFocused(false)}
            />
          ) : (
            <Recent handleClose={() => setIsFocused(false)} />
          )}
        </div>
      )}
    </div>
  )
}
