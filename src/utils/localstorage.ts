const RECENT_ITEM_IDS_KEY = 'recent_item_ids_[]'
const RECENT_KEYWORDS_KEY = 'recent_keywords_[]'

const getArray = (key: string) => {
  try {
    const items = localStorage.getItem(key)
    if (items) {
      return JSON.parse(items)
    }
    return []
  } catch {
    return []
  }
}

const setArray = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getRecentKeywords = (): string[] => getArray(RECENT_KEYWORDS_KEY)

export const addRecentKeyword = (keyword: string) => {
  const items = getRecentKeywords()
  const existItem = items.find((item) => item === keyword)

  if (existItem) {
    const prevItems = items.filter((item) => item !== keyword)
    setArray(RECENT_KEYWORDS_KEY, [keyword, ...prevItems])
  } else {
    setArray(RECENT_KEYWORDS_KEY, [keyword, ...items])
  }
}

export const clearRecentKeyword = () => {
  localStorage.removeItem(RECENT_KEYWORDS_KEY)
}

export const getRecentItemIds = (): string[] => getArray(RECENT_ITEM_IDS_KEY)

export const addRecentItemId = (productId: string) => {
  const items = getRecentItemIds()
  const existItem = items.find((item) => item === productId)

  if (existItem) {
    const prevItems = items.filter((item) => item !== productId)
    setArray(RECENT_ITEM_IDS_KEY, [productId, ...prevItems])
  } else {
    setArray(RECENT_ITEM_IDS_KEY, [productId, ...items])
  }
}

export const removeRecentItemId = (productId: string) => {
  const items = getRecentItemIds()
  setArray(
    RECENT_ITEM_IDS_KEY,
    items.filter((item) => item !== productId),
  )
}
