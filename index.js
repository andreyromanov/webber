const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

async function main() {

  const browser = await puppeteer.launch({
    headless: true
  });


  const page = await browser.newPage();

  await page.goto('https://dom.ria.com/uk/search/#links-under-filter=on&category=1&realty_type=0&operation_type=3&fullCategoryOperation=1_0_3&page=0&state_id=12&city_id=12&limit=30&sort=inspected_sort&period=0&csrf=KTIekYBV-KYClCWoJX0xVeJwlnkIXXLGNLa4&d_id=15250:15810:15815:17789:17854:17855:17856:17857:17858&ch=235_f_5500,235_t_6000,246_244');

  const content = await page.content();

  const $ = cheerio.load(content);
  const titles = [];

  $('.tit').slice(0, 10).each((idx, elem) => {
    
    const title = $(elem).text();
  
    
    titles.push(title);
  })

    console.log(titles);


  browser.close();
}


main();