const {
  chromium
} = require(`playwright`);
const {
  test,
  expect
} = require("@playwright/test");

const user = require("./user");
const email = user.userData.emailValue;
const password = user.userData.passwordValue;

(async () => {
  const browser = await chromium.launch({
      headless: false
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://netology.ru/?modal=sign_in');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(email);
  await page.getByPlaceholder('Пароль').click();
  await page.getByPlaceholder('Пароль').fill(password);
  await page.getByTestId('login-submit-btn').click();
  await expect(page).toHaveURL(`https://netology.ru/profile`);
  await page.waitForTimeout(5000);
  await expect(page.getByRole('heading', {
      name: 'Моё обучение'
  })).toHaveText('Моё обучение');

  await context.close();
  await browser.close();
})();