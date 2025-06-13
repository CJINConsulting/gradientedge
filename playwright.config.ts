import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

const baseURL: string = "https://www.amazon.co.uk/";

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
	reporter: "html",
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Base URL to use in actions like `await page.goto('/')`. */
		// baseURL: 'http://localhost:3000',

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: "on-first-retry",
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: "chromium",
			use: {
				...devices["Desktop Chrome"],
				baseURL: baseURL,
			},
		},

		{
			name: "firefox",
			use: {
				...devices["Desktop Firefox"],
				baseURL: baseURL,
			},
		},

		{
			name: "webkit",
			use: {
				...devices["Desktop Safari"],
				baseURL: baseURL,
			},
		},

		/* Test against mobile viewports. */
		{
			name: "iPhone",
			use: {
				...devices["iPhone 15 Pro Max"],
				baseURL: baseURL,
				screenshot: 'on',
				video: 'on'

			},
		},

		{
			name: "Samsung",
			use: {
				...devices["Galaxy S24"],
				baseURL: baseURL,
			},
		},
	],
});
