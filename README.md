 # Autotests for authorization
This project contains automated tests to check negative authorization scenarios.
 # Setting Environment Variables
APP_URL=https://fe-delivery.tallinn-learning.ee/signin
Configure the secret `APP_URL` in the repository settings.
 # Running tests
'npm run dev'
'npx playwright test'
 # Run with ENV in console
'APP_URL=https://fe-delivery.tallinn-learning.ee/signin npx playwright test TallinnDeliveryAuthorization.spec.ts --debug --project=chromium'