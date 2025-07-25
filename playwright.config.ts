import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
	testDir: "./ui",
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 1,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: [
		["html", { outputFolder: "./playwright-report" }],
		["junit", { outputFolder: "./test-results/test-results.xml" }],
	],
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Base URL to use in actions like `await page.goto('/')`. */
		baseURL: "https://www.amazon.co.uk",

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: "on-first-retry",
		screenshot: "on",
		video: "on",
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: "chromium",
			use: {
				...devices["Desktop Chrome"],
			},
		},

		{
			name: "firefox",
			use: {
				...devices["Desktop Firefox"],
			},
		},

		{
			name: "webkit",
			use: {
				...devices["Desktop Safari"],
			},
		},

		/* Test against mobile viewports. */
		{
			name: "iPhone",
			use: {
				...devices["iPhone 15 Pro Max"],
				screenshot: "on",
				video: "on",
			},
		},

		{
			name: "Samsung",
			use: {
				...devices["Galaxy S24"],
			},
		},
	],
});
