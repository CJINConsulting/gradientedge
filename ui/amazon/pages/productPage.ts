import { Locator, Page } from "playwright/test";
import { PlaywrightPage } from "../../../shared/pages/playwrightPage";

export class ProductPage extends PlaywrightPage {
	public readonly btnAddToBasket: Locator;
	public readonly hdrAddedToBasket: Locator;

	constructor(page: Page) {
		super(page);

		this.btnAddToBasket = page.getByTitle('Add to Shopping Basket');
		this.hdrAddedToBasket = page.getByRole('heading', { name: 'Added to basket' });
	}

	public async isItemAddedToBasket(): Promise<boolean> {
		await this.waitForPageLoad();
		return await this.hdrAddedToBasket.isVisible();
	}
}
