import { Locator, Page, expect } from "playwright/test";

export class PlaywrightPage {
	protected page: Page;
	public readonly btnAllowCookies: Locator;
	public readonly lnkShoppingBasket: Locator;
	public readonly txtShoppingBasketCount: Locator;

	constructor(page: Page) {
		this.page = page;
		this.btnAllowCookies = page.getByRole("button", { name: "Accept" });
		this.lnkShoppingBasket = page.getByRole("link", { name: /shopping basket/ });
		this.txtShoppingBasketCount = page.locator("#nav-cart-count");
	}

	protected async acceptCookiePreferences() {
		await this.page.waitForLoadState("load");

		if (await this.btnAllowCookies.isVisible()) {
			await this.btnAllowCookies.click();
			await this.btnAllowCookies.waitFor({ state: "hidden" });
		}
	}

	public async openShoppingBasket(): Promise<void> {
		await this.page.waitForLoadState("load");

		// Scroll the top of the viewport
		await this.page.evaluate(() => {
			window.scrollTo(0, 0); // Scroll to the top of the page
		});

		await this.lnkShoppingBasket.scrollIntoViewIfNeeded();
		await this.lnkShoppingBasket.click();
	}

	public async checkShoppingBasketCount(count: string): Promise<void> {
		await this.page.waitForLoadState("load");
		expect(await this.txtShoppingBasketCount).toContainText(count);
	}
}
