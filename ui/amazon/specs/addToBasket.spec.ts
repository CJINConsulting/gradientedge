import { test, expect } from '../fixtures/pageObjects';

test.describe("Amazon - Add items to the basket", () => {
	
	test("Add 1 item", async ( { homePage }) => {
		
		
	});

	test("Add 2 items", { tag: ["@Smoke"] }, async ({ page }) => {
		await page.goto("https://playwright.dev/");

		// Click the get started link.
		await page.getByRole("link", { name: "Get started" }).click();

		// Expects page to have a heading with the name of Installation.
		await expect(page.getByRole("heading", { name: "Installation" })).toBeVisible();
	});
});
