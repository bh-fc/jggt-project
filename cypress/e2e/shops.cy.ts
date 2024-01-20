describe('상점 페이지', () => {
  it('상품 탭 클릭시 상품 탭으로 이동해야 한다', () => {
    cy.visit('http://localhost:3000/shops/mock-shop-id')
    cy.get('a[data-cy="shops-products-tab"]').click()
    cy.url().should('eq', 'http://localhost:3000/shops/mock-shop-id/products')
  })
  it('상점 후기 탭 클릭시 상점 후기 탭으로 이동해야 한다', () => {
    cy.visit('http://localhost:3000/shops/mock-shop-id')
    cy.get('a[data-cy="shops-reviews-tab"]').click()
    cy.url().should('eq', 'http://localhost:3000/shops/mock-shop-id/reviews')
  })
  it('찜 탭 클릭시 찜 탭으로 이동해야 한다', () => {
    cy.visit('http://localhost:3000/shops/mock-shop-id')
    cy.get('a[data-cy="shops-likes-tab"]').click()
    cy.url().should('eq', 'http://localhost:3000/shops/mock-shop-id/likes')
  })
  it('팔로잉 탭 클릭시 팔로잉 탭으로 이동해야 한다', () => {
    cy.visit('http://localhost:3000/shops/mock-shop-id')
    cy.get('a[data-cy="shops-following-tab"]').click()
    cy.url().should('eq', 'http://localhost:3000/shops/mock-shop-id/following')
  })
  it('팔로워 탭 클릭시 팔로워 탭으로 이동해야 한다', () => {
    cy.visit('http://localhost:3000/shops/mock-shop-id')
    cy.get('a[data-cy="shops-follower-tab"]').click()
    cy.url().should('eq', 'http://localhost:3000/shops/mock-shop-id/follower')
  })
})
