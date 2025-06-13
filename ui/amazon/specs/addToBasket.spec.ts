import { test } from "../fixtures/pageObjects";
import { expect } from "@playwright/test";

test.describe("Amazon - Add items to the basket", () => {
	test("Add an item to the basket", { tag: "@Smoke" }, async ({ homePage, resultsPage, basketPage }) => {
		await homePage.load();
		await homePage.searchForProduct("aa batteries");
		await resultsPage.selectAddToBasketButton(1);
		await expect(resultsPage.txtShoppingBasketCount).toContainText("1");
	});
});
