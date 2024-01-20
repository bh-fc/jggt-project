describe('상품 상세 페이지', () => {
  it('각 항목들이 노출되어야 한다', () => {
    cy.visit('http://localhost:3000/products/mock-data-id')
    cy.contains('문의하기')
    cy.contains('상품 정보')
    cy.contains('상점 정보')
    cy.contains('상점후기')
  })
})
