import { test } from "../fixtures/pageObjects";
import { expect } from "@playwright/test";

const productName = "100-Pack AA Alkaline High-Performance Batteries";

test.describe("Amazon - Basket Operations", () => {
	test.beforeEach("Add a product to the basket", async ({ homePage, productPage, resultsPage }) => {
		await homePage.load();
		await homePage.searchForProduct(productName);

		// Open the product page
		const product = await resultsPage.getProductByName(productName);
		await product.waitFor({ state: "visible" });
		await product.click();

		// Select add to basket from product page
		await productPage.btnAddToBasket.click();
		expect(await productPage.isItemAddedToBasket()).toBeTruthy();
		expect(resultsPage.txtShoppingBasketCount).toContainText("1");

		// Open the basket and manipulate the product
		await resultsPage.openShoppingBasket();
	});

	test("Update the basket item amount", { tag: "@Smoke" }, async ({ basketPage }) => {
		await basketPage.increaseQuantityByOne();
		await expect(basketPage.txtShoppingBasketCount).toContainText("2");

		await basketPage.decreaseQuantityByOne();
		await expect(basketPage.txtShoppingBasketCount).toContainText("1");

		await basketPage.deleteItem();
		await expect(basketPage.txtShoppingBasketCount).toContainText("0");
	});
});
