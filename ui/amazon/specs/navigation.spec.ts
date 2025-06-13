import { test } from "../fixtures/pageObjects";
import { expect } from "@playwright/test";

test.describe("Amazon - Product Navigation", () => {
	test("Can search for products", { tag: "@Smoke" }, async ({ homePage, resultsPage }) => {
		await homePage.load();
		await homePage.searchForProduct("aa batteries");

		await expect(resultsPage.btnAddToBasket.first()).toBeVisible();
	});
});
