import { test } from "../fixtures/pageObjects";
import { expect } from "@playwright/test";

const productName = "20-Pack AA Alkaline High-Performance Batteries";

test.describe("Amazon - Product Navigation", () => {
	test("Can search for products", { tag: "@Smoke" }, async ({ homePage, resultsPage }) => {
		await homePage.load();
		await homePage.searchForProduct(productName);

		await expect(await resultsPage.getProductByName(productName)).toBeVisible();
	});
});
