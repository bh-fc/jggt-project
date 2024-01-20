import dynamic from 'next/dynamic'
import { useRef, useState } from 'react'

import ProductsLayout from '../ProductsLayout'

import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import Text from '@/components/common/Text'
import Container from '@/components/layout/Container'
import MarkdownEditorSkeleton from '@/components/shared/MarkdownEditor/Skeleton'
import { City, cities, getDistricts } from '@/utils/address'

type Props = {
  id: string
  imageUrls: string[]
  title: string
  isUsed: boolean
  isChangable: boolean
  price: number
  city: City
  district: string
  description: string
  tags: string[]
}

const MarkdownEditor = dynamic(
  () => import('@/components/shared/MarkdownEditor'),
  {
    ssr: false,
    loading: () => <MarkdownEditorSkeleton />,
  },
)

export default function ProductForm({
  id: defaultId,
  imageUrls: defaultImageUrls,
  title: defaultTitle,
  isUsed: defaultIsUsed,
  isChangable: defaultIsChangable,
  price: defaultPrice,
  city: defaultCity,
  district: defaultDistrict,
  description: defaultDescription,
  tags: defaultTags,
}: Partial<Props>) {
  const tagInputRef = useRef<HTMLInputElement>(null)
  const [tags, setTags] = useState<string[]>(defaultTags || [])
  const [city, setCity] = useState<City | undefined>(defaultCity)
  const [description, setDescription] = useState<string>(
    defaultDescription || '',
  )

  const uploadImage = (file: File) => {
    alert(file.name)
  }

  const handleAddTag = () => {
    if (!tagInputRef.current) {
      return
    }

    const tagValue = tagInputRef.current.value.trim()

    tagInputRef.current.value = ''

    if (tags.length >= 5) {
      return
    }

    setTags((prevTags) => {
      if (!prevTags.find((tag) => tag === tagValue)) {
        return [...prevTags, tagValue]
      }
      return prevTags
    })
  }

  const handleRemoveTag = (tag: string) => {
    setTags((prevTags) => prevTags.filter((tagItem) => tagItem !== tag))
  }

  return (
    <ProductsLayout currentTab={defaultId ? undefined : 'new'}>
      <form>
        {defaultId && (
          <input type="hidden" name="id" defaultValue={defaultId} />
        )}
        <Container>
          <div className="my-10 border-b-2 border-black py-7">
            <Text size="2xl" className="mr-3">
              {defaultId ? '수정하기' : '상품정보'}
            </Text>
            <Text size="md" color="red">
              * 필수정보
            </Text>
          </div>
          <div className="flex border-b border-grey-300 pb-7 pt-5">
            <div className="w-40">
              <Text size="lg"> 상품 이미지 </Text>
              <Text size="lg" color="grey" weight="light">
                (0/3)
              </Text>
              <Text size="md" color="red">
                *
              </Text>
            </div>
            <div>
              <>
                <label htmlFor="image">
                  <div className="w-40 h-40 border flex justify-center items-center cursor-pointer">
                    파일 업로드 하기
                  </div>
                </label>
                <input
                  type="file"
                  id="image"
                  accept=".jpg, .jpeg, .png"
                  hidden
                  onChange={(e) => {
                    if (e.target.files![0]) {
                      uploadImage(e.target.files![0])
                    }
                  }}
                />
              </>
            </div>
          </div>
          <div className="flex border-b border-grey-300 pb-7 pt-5">
            <div className="w-40">
              <Text size="lg"> 상품명 </Text>
              <Text size="md" color="red">
                *
              </Text>
            </div>
            <div className="flex-1">
              <Input
                type="text"
                className="w-full px-3 py-2"
                placeholder="상품명을 입력해주세요"
                name="title"
                defaultValue={defaultTitle}
                required
              />
            </div>
          </div>
          <div className="flex border-b border-grey-300 pb-7 pt-5">
            <div className="w-40">
              <Text size="lg"> 상품상태 </Text>
              <Text size="md" color="red">
                *
              </Text>
            </div>
            <div className="flex-1">
              <select
                required
                name="isUsed"
                className="border py-1 px-2 w-32"
                defaultValue={
                  defaultIsUsed === undefined
                    ? undefined
                    : defaultIsUsed
                      ? 'y'
                      : 'n'
                }
              >
                <option value="y">신품</option>
                <option value="n">중고</option>
              </select>
            </div>
          </div>
          <div className="flex border-b border-grey-300 pb-7 pt-5">
            <div className="w-40">
              <Text size="lg"> 교환 </Text>
              <Text size="md" color="red">
                *
              </Text>
            </div>
            <div className="flex-1">
              <select
                required
                name="isChangable"
                className="border py-1 px-2 w-32"
                defaultValue={
                  defaultIsChangable === undefined
                    ? undefined
                    : defaultIsChangable
                      ? 'y'
                      : 'n'
                }
              >
                <option value="y">가능</option>
                <option value="n">불가</option>
              </select>
            </div>
          </div>
          <div className="flex border-b border-grey-300 pb-7 pt-5">
            <div className="w-40">
              <Text size="lg"> 가격 </Text>
              <Text size="md" color="red">
                *
              </Text>
            </div>
            <div className="flex-1">
              <Input
                type="number"
                className="w-full px-3 py-2"
                placeholder="가격을 입력해주세요"
                name="price"
                defaultValue={defaultPrice}
                required
              />
            </div>
          </div>
          <div className="flex border-b border-grey-300 pb-7 pt-5">
            <div className="w-40">
              <Text size="lg"> 거래지역 </Text>
              <Text size="md" color="red">
                *
              </Text>
            </div>
            <div className="flex-1 flex gap-2">
              <select
                className="border py-1 px-2 w-32"
                name="city"
                required
                defaultValue={defaultCity}
                onChange={(e) => {
                  if (e.currentTarget.value) {
                    setCity(e.currentTarget.value as City)
                  } else {
                    setCity(undefined)
                  }
                }}
              >
                <option value="">선택</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {!!city && (
                <select
                  className="border py-1 px-2 w-32"
                  name="district"
                  defaultValue={defaultDistrict}
                >
                  <option value=""> 선택 </option>
                  {getDistricts(city).map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
          <div className="flex border-b border-grey-300 pb-7 pt-5">
            <div className="w-40">
              <Text size="lg"> 상품태그 </Text>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex gap-2 flex-wrap">
                {tags.map((tag) => (
                  <div
                    key={tag}
                    className="bg-purple-200 rounded-lg px-2 flex justify-center items-center"
                  >
                    {tag}
                    <span
                      className="material-symbols-outlined cursor-pointer"
                      style={{ fontSize: '1.25rem' }}
                      onClick={() => handleRemoveTag(tag)}
                    >
                      close
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex w-96">
                <Input
                  className="flex-1"
                  name="tag"
                  type="text"
                  placeholder="태그를 입력하세요. (최대 5개)"
                  ref={tagInputRef}
                  disabled={tags.length >= 5}
                />
                <Button
                  type="button"
                  disabled={tags.length >= 5}
                  onClick={() => {
                    handleAddTag()
                  }}
                >
                  입력
                </Button>
              </div>
            </div>
          </div>
          <div className="flex border-b border-grey-300 pb-7 pt-5">
            <div className="w-40">
              <Text size="lg"> 상품설명 </Text>
              <Text size="md" color="red">
                *
              </Text>
            </div>
            <div className="flex-1">
              <MarkdownEditor
                initialValue={description}
                handleOnChage={(value) => {
                  setDescription(value)
                }}
              />
            </div>
          </div>
        </Container>
        <div className="sticky bottom-0 z-50 bg-gray-100 py-4 border-t border-gray-200">
          <Container>
            <div className="flex justify-end">
              <Button color="red" className="w-28 h-12">
                {defaultId ? '수정하기' : '등록하기'}
              </Button>
            </div>
          </Container>
        </div>
      </form>
    </ProductsLayout>
  )
}
