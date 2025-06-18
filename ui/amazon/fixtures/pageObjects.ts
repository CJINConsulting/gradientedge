import { test as base, expect } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { BasketPage } from "../pages/basketPage";
import { ResultsPage } from "../pages/resultsPage";
import { ProductPage } from "../pages/productPage";

type PageObjects = {
	homePage: HomePage;
	basketPage: BasketPage;
	resultsPage: ResultsPage;
	productPage: ProductPage
};
const test = base.extend<PageObjects>({
	homePage: async ({ page }, use) => {
		await use(new HomePage(page));
	},
	basketPage: async ({ page }, use) => {
		await use(new BasketPage(page));
	},
	resultsPage: async ({ page }, use) => {
		await use(new ResultsPage(page));
	},
	productPage: async ({ page }, use) => {
		await use(new ProductPage(page));
	},
});

export { test, expect };
export type { PageObjects };
