import { Locator, Page, expect } from "playwright/test";

export class PlaywrightPage {
	protected page: Page;
	public readonly btnAllowCookies: Locator;
	public readonly btnContinueShopping: Locator;
	public readonly lnkShoppingBasket: Locator;
	public readonly txtShoppingBasketCount: Locator;

	public readonly lnkMobileCart: Locator;

	constructor(page: Page) {
		this.page = page;
		this.btnAllowCookies = page.getByRole("button", { name: "Accept" });
		this.btnContinueShopping = page.getByRole("button", { name: "Continue shopping" });
		this.lnkShoppingBasket = page.getByRole("link", { name: /shopping basket/ });
		this.lnkMobileCart = page.getByLabel("Cart", { exact: true });
		this.txtShoppingBasketCount = page.locator("#nav-cart-count");
	}

	protected async acceptCookiePreferences() {
		await this.waitForPageLoad();
		await this.btnAllowCookies.waitFor({ state: "visible" });
		await this.btnAllowCookies.click();
		await this.btnAllowCookies.waitFor({ state: "hidden" });
	}

	protected async continueShopping() {
		// In CI, Amazon sometimes asks you to continue shopping on new sessions
		// Not sure if this is session overlap, or a bot check
		await this.page.waitForLoadState("load");

		if (await this.btnContinueShopping.isVisible()) {
			await this.btnContinueShopping.click();
			await this.btnContinueShopping.waitFor({ state: "hidden", timeout: 5000 });
		}
	}

	public async openShoppingBasket(): Promise<void> {
		await this.page.waitForLoadState("load");

		// Scroll the top of the viewport
		await this.page.evaluate(() => {
			window.scrollTo(0, 0); // Scroll to the top of the page
		});

		if (await this.isMobileViewPort()) {
			await this.lnkMobileCart.click();
		} else {
			await this.lnkShoppingBasket.click();
		}
	}

	public async checkShoppingBasketCount(count: string): Promise<void> {
		expect(await this.txtShoppingBasketCount).toContainText(count, { timeout: 5000 });
	}

	public async isMobileViewPort(): Promise<Boolean> {
		const viewport = await this.page.viewportSize();

		if (viewport && viewport.width <= 768) {
			return true;
		}

		return false;
	}

	public async waitForPageLoad(): Promise<void> {
		await this.page.waitForLoadState("load");
	}
}
