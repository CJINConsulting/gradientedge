import { Locator, Page } from "playwright/test";
import { PlaywrightPage } from "../../../shared/pages/playwrightPage";

export class ResultsPage extends PlaywrightPage {
	public readonly txtItemAdded: Locator;
	public readonly btnAddToBasket: Locator;

	constructor(page: Page) {
		super(page);

		this.txtItemAdded = page.getByText("Item added");
		this.btnAddToBasket = page.getByRole("button", { name: "Add to basket" });
	}

	public async selectAddToBasketButton(index: number): Promise<void> {
		// await this.page.waitForLoadState("load");

		// Select the button based on the provided index (1-based index)
		await this.page
			.getByRole("button", { name: "Add to basket" })
			.nth(index - 1)
			.click();

		// Item added message should pop up then disappear
		await this.txtItemAdded.waitFor({ state: "visible" });
		await this.txtItemAdded.waitFor({ state: "hidden" });
	}

	/**
	 * Finds the first product in the search results that matches the product name.
	 * @param partialProductName 
	 * @returns a Locator element of the search result link
	 */
	public async getProductByName(partialProductName: string): Promise<Locator> {
		// const product = this.page.locator(`//span[contains(text(), '${partialProductName}')]`);
		const product = this.page.getByRole("link", { name: partialProductName }).first();
		return product;
	}
}
