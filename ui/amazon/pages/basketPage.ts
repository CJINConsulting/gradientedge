import { Locator, Page } from "playwright/test";
import { PlaywrightPage } from "../../../shared/pages/playwrightPage";

export class BasketPage extends PlaywrightPage {
	public readonly btnIncreaseQuantityByOne: Locator;
	public readonly btnDecreaseQuantityByOne: Locator;
	public readonly btnDeleteItem: Locator;

	constructor(page: Page) {
		super(page);

		this.btnIncreaseQuantityByOne = page.getByRole("button", { name: "Increase quantity by one", exact: true });
		this.btnDecreaseQuantityByOne = page.getByRole("button", { name: "Decrease quantity by one", exact: true });
		this.btnDeleteItem = page.getByRole("button", { name: /Delete/ });
	}

	public async increaseQuantityByOne(): Promise<void> {
		await this.waitForPageLoad();
		await this.btnIncreaseQuantityByOne.click();
		
	}

	public async decreaseQuantityByOne(): Promise<void> {
		await this.waitForPageLoad();
		await this.btnDecreaseQuantityByOne.click();
		await this.btnIncreaseQuantityByOne.waitFor({ state: "visible" });
	}

	public async deleteItem(): Promise<void> {
		await this.waitForPageLoad();
		await this.btnDeleteItem.click();
		await this.btnDeleteItem.waitFor({ state: "hidden" });
	}
}
