import {test, expect } from "../fixtures/shoppingCart-fixtures"

test.describe('Shopping Cart', () => {
    test('Test Case 01 - Available Courses Section Validation', async({ shoppingCart }) => {

        await test.step('2. Validate the heading is “Available Courses”', async () => {
            await expect(shoppingCart.heading).toHaveText('Available Courses');
        })

        await test.step('3. Validate that there are 3 courses displayed', async () => {
            await expect(shoppingCart.courses).toHaveCount(3);
        })

        await test.step('4. Validate that each course has an image, name, TechGlobal School tag, and a price of more than zero', async () => {
            const coursesInfo = [
                shoppingCart.coursesImages,
                shoppingCart.coursesNames,
                shoppingCart.schoolTags,
                shoppingCart.coursesPrices
            ]
            
            for(const element of coursesInfo) {
                const info = await element.all();
                for(const ele of info) {
                    await expect(ele).toBeVisible()
                }

                const allPrices = await shoppingCart.coursesPrices.all();
                
                for(const priceLocator of allPrices) {
                    const price = await priceLocator.textContent();

                    const cleanedPrice = shoppingCart.convertStringToNumber(price?);
                    
                    console.log(cleanedPrice) // Why are they duplicating??

                    expect(cleanedPrice).toBeGreaterThan(0);
                }
            }
        })

        await test.step('5. Validate the first 2 courses have discount tags', async () => {
            for(let i = 0; i <= 1; i++) {
                const discountTagCount = await shoppingCart.courses.nth(i).locator('[data-testid="discount"]').count();
                
                expect(discountTagCount).toBe(1);

                expect(shoppingCart.coursesDiscounts.nth(i)).toBeVisible();
                
            }
        })

        await test.step('6. Validate that there is an “Add to Cart” button under each course which is displayed, enabled, and has the text “Add to Cart”', async () => {
            for(let i = 0; i <= 2; i++) {
                const addToCartButtonCount = await shoppingCart.courses.nth(i).locator('button').count();
                
                expect(addToCartButtonCount).toBe(1);

                expect(shoppingCart.addToCartButtons.nth(i)).toBeVisible();
                expect(shoppingCart.addToCartButtons.nth(i)).toBeEnabled();
                expect(shoppingCart.addToCartButtons.nth(i)).toHaveText('Add to Cart');
                
            }
        })
    })

    test('Test Case 02 - Cart Section Validation', async({ shoppingCart }) => {

        await test.step('2. Validate the heading is “Items Added to Cart”', async () => {
            await expect(shoppingCart.heading).toHaveText('Available Courses');
        })

        await test.step('3. Validate that the cart is empty by default', async () => {
            const itemCount = await shoppingCart.itemsInCart.count()
            expect(itemCount).toBe(0);
        })

        await test.step('4. Validate that the total price is zero “$0” by default', async () => {
            const defaultTotalPrice = await shoppingCart.totalPrice.allTextContents();
            const cleanedDefaultTotalPrice = defaultTotalPrice.replace(/[^\d$]/g, '');
            expect(cleanedDefaultTotalPrice).toBe('$0');
        })

        await test.step('5. Validate that there is a “Place Order” button is displayed, disabled, and has the text “Place Order”', async () => {
            await expect(shoppingCart.placeOrderButton).toBeVisible();
            await expect(shoppingCart.placeOrderButton).toBeDisabled();
            await expect(shoppingCart.placeOrderButton).toHaveText("Place Order");
        })

    })

    test('Test Case 03 - Add a Course to the Cart and Validate', async({ shoppingCart }) => {

        await test.step('2. Click on the “Add to Cart” button for one of the courses', async () => {
            await shoppingCart.addToCart(0);
        })

        await test.step('3. Validate that the course is displayed in the cart with its image, name, and discount amount if available', async () => {
            const itemCount = await shoppingCart.itemsInCart.count()
            expect(itemCount).toBe(1);

           // NOT FINISHED
        })

        await test.step('4. Validate that the course price is added to the total price excluding the discount amount', async () => {
            const priceWithDiscount = 
        })
    })


})