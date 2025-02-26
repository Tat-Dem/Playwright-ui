import {test, expect} from "@playwright/test";
import {faker} from "@faker-js/faker";


test.describe("Negative authorization tests", async () => {
    test.beforeEach(async ({page}) => {
        await page.goto(process.env.APP_URL)
    });

    test("Empty login field", async ({page}) => {
        const formError = page.locator('[class="form-error form-error_active"]');
        const usernameField = page.locator('[data-name="username-input"]');

        await usernameField.fill(faker.string.alpha(2));
        await usernameField.fill(faker.string.alpha(0));

        await expect(formError).toContainText('The field must be filled in');
    });

    test("Empty password field", async ({page}) => {
        const passwordField = page.locator('[name="password"]')
        const formError = page.locator('[class="form-error form-error_active"]');

        await passwordField.fill(faker.internet.password({ length: 5}))
        await passwordField.fill(faker.internet.password({ length: 0 }));

        await expect(formError).toContainText('The field must be filled in');
    });

    test("Invalid login", async({page}) => {
        const usernameField = page.locator('[data-name="username-input"]');
        const passwordField = page.locator('[name="password"]');
        const singInButton = page.locator('[data-name="signIn-button"]');
        const popupErrorTitle = page.locator('[class="error-popup__title"]');

        await usernameField.fill(faker.internet.username());
        await passwordField.fill("CorrectPassword123");
        await expect (singInButton).toBeEnabled();
        await singInButton.click();

        await expect(popupErrorTitle).toContainText("Incorrect credentials");

    });
    test("Invalid password", async({page}) => {
        const usernameField = page.locator('[data-name="username-input"]');
        const passwordField = page.locator('[name="password"]');
        const singInButton = page.locator('[class="button login__button"]');
        const popupErrorTitle = page.locator('[class="error-popup__title"]');

        await usernameField.fill("validUser");
        await passwordField.fill(faker.internet.password());
        await expect (singInButton).toBeEnabled();
        await singInButton.click();

        await expect(popupErrorTitle).toContainText("Incorrect credentials");
    });
});