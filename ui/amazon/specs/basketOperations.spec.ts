import { test } from "../fixtures/pageObjects";
import { expect } from "@playwright/test";

test.describe("Amazon - Basket Operations", () => {
	test("Update the basket item amount", { tag: "@Smoke" }, async ({ homePage, resultsPage, basketPage }) => {
		await homePage.load();
		await homePage.searchForProduct("Amazon Basics 100-Pack AA");
		await resultsPage.selectAddToBasketButton(1);

		await expect(resultsPage.txtShoppingBasketCount).toContainText("1");

		await resultsPage.openShoppingBasket();

		await basketPage.increaseQuantityByOne();
		await expect(resultsPage.txtShoppingBasketCount).toContainText("2");

		await basketPage.decreaseQuantityByOne();
		await expect(resultsPage.txtShoppingBasketCount).toContainText("1");

		await basketPage.deleteItem();
		await expect(resultsPage.txtShoppingBasketCount).toContainText("0");
	});
});
