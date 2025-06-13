import { Locator, Page } from "playwright/test";
import { PlaywrightPage } from "../../../shared/pages/playwrightPage";

export class HomePage extends PlaywrightPage {
	public readonly txtSearchBox: Locator;
	public readonly btnSearchSubmit: Locator;

	constructor(page: Page) {
		super(page);

		this.txtSearchBox = page.getByLabel("Search Amazon.co.uk");
		this.btnSearchSubmit = page.getByRole("button", { name: "Go", exact: true });
	}

	public async load(): Promise<void> {
		await this.page.goto("/");
		await this.continueShopping();
		await this.acceptCookiePreferences();
	}

	public async searchForProduct(productName: string): Promise<void> {
		await this.page.waitForLoadState("load");
		await this.txtSearchBox.fill(productName);
		await this.btnSearchSubmit.click();
	}
}

//select top offer
//select basket
