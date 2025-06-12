# QA Engineer Technical Exercise 
## Objective 
We’d like you to create an automated test suite that covers the following scenarios on Amazon (or a similar e-commerce platform): 
1. Navigation  : Navigate to a product page. 
2. Add to Basket  : Add the product to the shopping basket. 
3. Basket Operations  : Perform operations within the basket,  including: 
   - Increase the quantity of an item. 
   - Decrease the quantity of an item. 
   - Remove an item from the basket. 

## Instructions

*Instructions on how to run the tests.*

### Run All Tests
```bash
npx playwright test
```

### Run Specific Test Files
To run specific test files, specify the file path:

```bash
npx playwright test tests/example.spec.js
```

### Run Tests with Specific Tags
If you added tags your tests and want to run only those with a specific tag e.g. @smoke:

```bash
npx playwright test --grep @smoke
```

### Run Tests in a Specific Project
You can run tests for a specific project:

```bash
npx playwright test --project=chromium
```

### Run Tests with a Specific Configuration
To run tests with a specific configuration file, use the --config option:

```bash
npx playwright test --config=playwright.config.js
```

### Run Tests in Headed Mode
To run tests with the browser UI visible:

```bash
npx playwright test --headed
```

### Run Tests with Slow Motion
To run tests with slow motion, which slows down each operation by a set number of ms:

```bash
npx playwright test --slow-mo=1000
```

### View the generated HTML report

```bash
npx playwright show-report
```

## Assumptions

*assumptions made during your implementation*
- multi-client project that would need separating out to support each client
- not looking to perform edge cases, boundary conditions, or ultra-specific scenarios that might require a level of mocking
- environments are available over HTTPS - no local dev servers
- Latest browsers and versions

## Architectural decisions

*describe the architectural decisions and reasoning behind your approach*

Playwright does a lot of the hard work in determining where things should go.

For CI, we can pass environment variables in from the pipeline and pick them up via `dotenv`. As an example, if we wanted to run a pipeline that tested multiple devices, we could create strategy matrices in the github yaml, and the playwright config would be able to see these values and pass them in at the project level. e.g.

```yaml
strategy:
    matrix:
        device: [iPhone 12, Pixel 5, Desktop Chrome]
        ...
steps:
    - name: Set device variable
      shell: bash
      run: |
        DEVICE="${{ matrix.device}}"
        echo "DEVICE_NAME=$DEVICE" >> $GITHUB_ENV
```

```ts
import dotenv from d
```

## Additional Considerations 
### Scalability: How would your test suite scale if the application under test grew in complexity? 

#### Examples

##### Multiple Items in Basket
- We may need to handle scenarios where multiple items are added to the basket. This includes verifying correct total price, handling discounts, and ensuring that the correct items are displayed

##### Unexpected Popups
- We may need to handle unexpected popups - such as warranty selection, cookie consent, special offers, etc
- This can be achieved by creating utility functions to close or interact with them
  
##### Minimum Purchase Amounts
- There may be some unexpected items that enforce minimum or maximum purchase amounts, or even specific amounts

##### Out of Stock Products
- We may need to handle scenarios where products are out of stock. This includes verifying that the application displays appropriate messages and prevents attempting to add out-of-stock items to the basket


### Modularity: Is your code modular and reusable?
#### Domain specific structure
- All code specific to the brand/client is structured underneath a top-level client folder
- Any shared items can go into a shared folder, if they are useful to multiple client. This keeps the codebase clean, test scripts brand-specific, minimises duplication and enables quicker scaling

#### Page Object Model (POM)
- The website has been partitioned into logical pages using the Page Object Model. This approach gives us reusable components for different pages and elements. The tests are more maintainable and easier to understand as a result

### Error Handling: How does your test handle unexpected situations, such as network issues or UI changes?

#### UI Changes
- UI changes are actively managed with clear locator management. If an element moves on the page, or has a slightly different name (e.g., from "Buy" to "Buy Now"), as long as the locator is still unique, the tests should be able to handle it
- If the UI changes significantly, I'd expect the tests to fail. If a button has a completely different name, or a locator value we'd expect to appear is no longer there, I'd want the test to fail. Even if the UI is still functional, this could impact the user experience.

#### Network Issues
- Network issues can be addressed with retry logic and timeout settings in the configuration
- You can set configurations like slowMo in the launchOptions if you want Playwright to slow down each operation. This is useful if you want to simulate a more realistic user interaction speed or account for slower network conditions.

#### Test Data Management
- We can use static test data for scenarios where the data does not change frequently, and store this in JSON files or environment variables
- For dynamic data, we can use a combination of faker values and utility jobs to simulate system values