import { useState } from 'react'

import ProductsLayout from '../_components/ProductsLayout'

import Input from '@/components/common/Input'
import Text from '@/components/common/Text'
import Container from '@/components/layout/Container'
import { City, cities, getDistricts } from '@/utils/address'

export default function ProductNew() {
  const [city, setCity] = useState<City | undefined>(undefined)
  const uploadImage = (file: File) => {
    alert(file.name)
  }

  return (
    <ProductsLayout currentTab="new">
      <Container>
        <form>
          <div className="my-10 border-b-2 border-black py-7">
            <Text size="2xl" className="mr-3">
              상품정보
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
              <select required name="isUsed" className="border py-1 px-2 w-32">
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
                <select className="border py-1 px-2 w-32" name="district">
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
        </form>
      </Container>
    </ProductsLayout>
  )
}
