import { test as base, expect } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { BasketPage } from "../pages/basketPage";
import { ResultsPage } from "../pages/resultsPage";

type PageObjects = {
	homePage: HomePage;
	basketPage: BasketPage;
	resultsPage: ResultsPage;
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
});

export { test, expect };
export type { PageObjects };
