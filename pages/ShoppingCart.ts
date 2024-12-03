import { type Locator, type Page } from "@playwright/test";

export class ShoppingCart {

    readonly page: Page
    readonly heading: Locator
    readonly courses: Locator
    readonly coursesImages: Locator
    readonly coursesNames: Locator
    readonly schoolTags: Locator
    readonly coursesPrices: Locator
    readonly coursesDiscounts: Locator
    readonly addToCartButtons: Locator
    readonly cartHeading: Locator
    readonly itemsInCart: Locator
    readonly totalPrice: Locator
    readonly placeOrderButton: Locator
  
    constructor(page: Page) {
      this.page = page
      this.heading = page.locator('.mt-2')
      this.courses = page.locator('[id^="course"]')
      this.coursesImages = page.locator('[id^="course"] img')
      this.coursesNames = page.locator('[id^="course"] h3')
      this.schoolTags = page.locator('[id^="course"] .my-3')
      this.coursesPrices = page.locator('[data-testid="full-price"] strong')
      this.coursesDiscounts = page.locator('[data-testid="discount"]')
      this.addToCartButtons = page.locator('[id^="course"] button')
      this.cartHeading = page.locator('.mb-2')
      this.itemsInCart = page.locator('.course-card')
      this.totalPrice = page.locator('#total-price')
      this.placeOrderButton = page.locator('.columns > div').last().locator('button')
    }

    async goto() {
        await this.page.goto('https://www.techglobal-training.com/frontend/project-8');
    }
    /**
     * 
     * @param n nth course that you are adding to cart
     * 
     * clicking on the course #n
     */ 
    async addToCart(n: number) {
        await this.addToCartButtons.nth(n).click();
    }

    convertStringToNumber(str: string): number {
        return Number(str.replace(/\D/g, ''));
    }

}