import { test } from "../fixtures/pageObjects";
import { expect } from "@playwright/test";

const productName = "100-Pack AA Alkaline High-Performance Batteries";

test.describe("Amazon - Add items to the basket", () => {
	test("Add an item to the basket", { tag: "@Smoke" }, async ({ homePage, resultsPage, productPage, basketPage }) => {
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
	});
});
