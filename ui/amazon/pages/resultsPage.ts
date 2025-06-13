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
		await this.page.waitForLoadState("load");

		// Select the button based on the provided index (1-based index)
		await this.page
			.getByRole("button", { name: "Add to basket" })
			.nth(index - 1)
			.click();

		// Item added message should pop up then disappear
		await this.txtItemAdded.waitFor({ state: "visible" });
		await this.txtItemAdded.waitFor({ state: "hidden" });
	}
}
