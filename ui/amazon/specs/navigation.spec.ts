import { test } from "../fixtures/pageObjects";
import { expect } from "@playwright/test";

const productName = "40 Pack Household Alkaline Batteries";

test.describe("Amazon - Product Navigation", () => {
	test("Can search for products", { tag: "@Smoke" }, async ({ homePage, resultsPage }) => {
		await homePage.load();
		await homePage.searchForProduct(productName);

		await expect(await resultsPage.getProductByName(productName)).toBeVisible();
	});
});
