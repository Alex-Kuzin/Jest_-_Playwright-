const {
  test,
  expect
} = require("@playwright/test");

test("test", async ({
  page
}) => {
  // Go to https://netology.ru/free/management#/
  await page.goto("https://netology.ru/free/management#/");

  // Click a
  await page.click("a");
  await expect(page).toHaveURL("https://netology.ru/");

  // Click text=Учиться бесплатно
  await page.click("text=Учиться бесплатно");
  await expect(page).toHaveURL("https://netology.ru/free");

  page.click("text=Бизнес и управление");

  // Click text=Как перенести своё дело в онлайн
  await page.click("text=Как перенести своё дело в онлайн");
  await expect(page).toHaveURL(
      "https://netology.ru/programs/kak-perenesti-svoyo-delo-v-onlajn-bp"
  );
});


NegativeAuthTest("test", async ({
  page
}) => {
  (async () => {
      const browser = await chromium.launch({
          headless: false,
          slowMo: 1000,
          devtools: true
      });
      const page = await browser.newPage();
      await page.goto("https://netology.ru/?modal=sign_in");
      await page.getByPlaceholder('Email').click();
      await page.getByPlaceholder('Email').fill("maymaymay1234@gmail.com");
      await page.getByPlaceholder('Пароль').click();
      await page.getByPlaceholder('Пароль').fill('passwordpasswordpassword123');
      await page.getByTestId('login-submit-btn').click();
      await expect(page).toHaveText("Вы ввели неправильно логин или пароль");

      await browser.close();
  })();

});
PozitiveAuthTest("test", async ({
  page
}) => {
  const {
      chromium
  } = require("playwright");
  (async () => {
      const browser = await chromium.launch({
          headless: false,
          slowMo: 1000,
          devtools: true
      });
      const page = await browser.newPage();
      await page.goto("https://netology.ru/?modal=sign_in");
      await page.getByPlaceholder('Email').click();
      await page.getByPlaceholder('Email').fill("");
      await page.getByPlaceholder('Пароль').click();
      await page.getByPlaceholder('Пароль').fill("");
      await page.getByTestId('login-submit-btn').click();
      await expect(page).toHaveURL("https://netology.ru/profile");
      await expect(page).toHaveText("Моё обучение");

      await browser.close();
  })();
});
