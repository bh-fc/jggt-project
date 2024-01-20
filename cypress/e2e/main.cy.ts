describe('메인페이지', () => {
  it('각 항목들이 노출되어야 한다', () => {
    cy.visit('http://localhost:3000')
    cy.contains('중고장터')
    cy.contains('판매하기')
    cy.contains('내 상점')
    cy.contains('채팅')
    cy.contains('찜한 상품')
    cy.contains('최근본상품')
  })
  it('판매 페이지로 이동할 수 있어야 한다', () => {
    cy.visit('http://localhost:3000')
    cy.wait(2000)
    cy.contains('판매하기').click()
    cy.contains('상품정보')
  })
  it('내 상점 페이지로 이동할 수 있어야 한다', () => {
    cy.visit('http://localhost:3000')
    cy.wait(2000)
    cy.contains('내 상점').click()
    cy.contains('상점명 수정')
    cy.contains('내 상점 관리')
    cy.contains('소개글 수정')
  })
  it('채팅 페이지로 이동할 수 있어야 한다', () => {
    cy.visit('http://localhost:3000')
    cy.wait(2000)
    cy.contains('채팅').click()
    cy.contains('대화를 선택해주세요')
  })
  it('검색창 클릭시 최근 검색어가 나와야 한다', () => {
    cy.visit('http://localhost:3000')
    cy.wait(2000)
    cy.get('input[placeholder="상품명, 상점명 입력"]').click()
    cy.contains('최근 검색어')
    cy.contains('최근 검색어가 없습니다')
  })
  it('검색어 입력시 자동 완성이 되어야 한다', () => {
    cy.visit('http://localhost:3000')
    cy.wait(2000)
    cy.get('input[placeholder="상품명, 상점명 입력"]').type('가위')
    cy.contains('상점 검색 >').next().contains('가위')
    cy.contains('가위 - 0').click()
    cy.url().should(
      'eq',
      `http://localhost:3000/search?query=${encodeURIComponent('가위 - 0')}`,
    )
  })
  it('상품 검색 이후 최근 검색어에 해당 검색어가 포함되어야 한다', () => {
    cy.visit('http://localhost:3000')
    cy.wait(2000)
    cy.get('input[placeholder="상품명, 상점명 입력"]').type('가위')
    cy.contains('가위 - 0').click()
    cy.wait(2000)
    cy.get('input[placeholder="상품명, 상점명 입력"]').clear()
    cy.contains('최근 검색어').parent().next().children().contains('가위 - 0')
  })
  it('상점 검색 클릭시 상점 검색이 되어야 한다', () => {
    cy.visit('http://localhost:3000')
    cy.wait(2000)
    cy.get('input[placeholder="상품명, 상점명 입력"]').type('가위')
    cy.contains('상점 검색 >').click()
    cy.url().should(
      'eq',
      `http://localhost:3000/search/shop?query=${encodeURIComponent('가위')}`,
    )
  })
})
