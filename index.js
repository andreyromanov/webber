const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const querystring = require('querystring');


async function main() {

  let articles = [];

  const data = {
  'search[filter_float_price:from]': '5000',
  'search[filter_float_price:to]': '6000'
  };

  const searchParams = querystring.stringify(data);

  const browser = await puppeteer.launch({
    headless: true
  });


  const page = await browser.newPage();

  //await page.goto('https://dom.ria.com/uk/search/#links-under-filter=on&category=1&realty_type=0&operation_type=3&fullCategoryOperation=1_0_3&page=0&state_id=12&city_id=12&limit=30&sort=inspected_sort&period=0&csrf=KTIekYBV-KYClCWoJX0xVeJwlnkIXXLGNLa4&d_id=15250:15810:15815:17789:17854:17855:17856:17857:17858&ch=235_f_5500,235_t_6000,246_244');
  
  await page.goto('https://www.olx.ua/nedvizhimost/kvartiry-komnaty/arenda-kvartir-komnat/odessa/?' + searchParams);

  const content = await page.content();

  const $ = cheerio.load(content);

  $('#offers_table .title-cell a').slice(0, 10).each((idx, elem) => {
    
    const title = $(elem).text().replace(/(\r\n|\n|\r)/gm, "").replace(/\s{2,}/g, ' ');
  
    
    articles.push({
      title : title,
      price : '5000-6000',
      source : 'olx'
    });
  })

    console.log(JSON.stringify(articles));


  browser.close();
}


main();