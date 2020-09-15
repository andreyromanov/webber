/**
 * Подключим библиотеку puppeteer.
 */
const puppeteer = require('puppeteer');

/**
 * В функции main размещаем код, который
 * будет использован в ходе веб-скрапинга.
 * Причина, по который мы создаём асинхронную функцию,
 * заключаемся в том, что мы хотим воспользоваться асинхронными
 * возможностями puppeteer.
 */
async function main() {
  /**
   * Запускаем Chromium. Установив ключ `headless` в значение false,
   * мы можем видеть интерфейс браузера.
   */
  const browser = await puppeteer.launch({
    headless: false
  });

  /**
   * Создаём новую страницу.
   */
  const page = await browser.newPage();

  /**
   * Используя новую страницу, переходим на https://api.ipify.org.
   */
  await page.goto('https://api.ipify.org');

  /**
   * Ждём 3 секунды и закрываем экземпляр браузера.
   */
  setTimeout(() => {
    browser.close();
  }, 30000);
}

/**
 * Запускаем скрипт, вызвав main().
 */
main();