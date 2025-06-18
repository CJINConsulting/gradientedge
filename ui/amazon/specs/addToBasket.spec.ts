import { test } from "../fixtures/pageObjects";
import { expect, Locator } from "@playwright/test";

const productName = "100-Pack AA Alkaline High-Performance Batteries";
let product: Locator;

test.describe("Amazon - Add items to the basket", () => {
	test.beforeEach("Search for Product", async ({ homePage, resultsPage }) => {
		await homePage.load();
		await homePage.searchForProduct(productName);

		// Open the product page
		product = await resultsPage.getProductByName(productName);
		await product.waitFor({ state: "visible" });
	});

	test("Add an item to the basket", { tag: "@Smoke" }, async ({ resultsPage, productPage }) => {
		await product.click();

		// Select add to basket from product page
		await productPage.btnAddToBasket.click();
		expect(await productPage.isItemAddedToBasket()).toBeTruthy();
		expect(resultsPage.txtShoppingBasketCount).toContainText("1");
	});
});
