const express = require('express')
const app = express()
const port = 3000
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const querystring = require('querystring');
//const got = require('got');
//const axios = require('axios');

app.get('/', async (req, res, next) => {
  const data = await main();
  res.send(data);
})

app.get('/igotoworld', async (req, res, next) => {
  const data = await guides();
  res.send(data);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

async function main() {

  let articles = [];

  const data = {
  'search[filter_float_price:from]': '5000',
  'search[filter_float_price:to]': '6000',
  'search[district_id]': '89'
  };

  let search_id ='';

  for (var prop in data) {
    search_id +=data[prop];
  
  }

  const searchParams = querystring.stringify(data);

  const browser = await puppeteer.launch({headless: true});

  const page = await browser.newPage();

  //const content = await got('https://www.olx.ua/nedvizhimost/kvartiry-komnaty/arenda-kvartir-komnat/odessa/?' + searchParams);

  //await page.goto('https://dom.ria.com/uk/search/#links-under-filter=on&category=1&realty_type=0&operation_type=3&fullCategoryOperation=1_0_3&page=0&state_id=12&city_id=12&limit=30&sort=inspected_sort&period=0&csrf=KTIekYBV-KYClCWoJX0xVeJwlnkIXXLGNLa4&d_id=15250:15810:15815:17789:17854:17855:17856:17857:17858&ch=235_f_5500,235_t_6000,246_244');
  
  await page.goto('https://www.olx.ua/nedvizhimost/kvartiry-komnaty/arenda-kvartir-komnat/odessa/?' + searchParams);

  const content = await page.content();

  const $ = cheerio.load(content);

  $('#offers_table .offer-wrapper').slice(0, 10).each((idx, elem) => {
    
    const title = $(elem).find('.title-cell a').text().replace(/(\r\n|\n|\r)/gm, "").replace(/\s{2,}/g, ' ');
    const price = $(elem).find('p.price').text().replace(/(\r\n|\n|\r)/gm, "").replace(/\s{2,}/g, ' ');
    
    articles.push({
      title : title,
      price : price,
      source : 'olx'
    });
  })
  
  browser.close();

  return JSON.stringify(articles);
}

async function guides() {

  let articles = [];

  const data = {
  
  };

  let search_id ='';

  for (var prop in data) {
    search_id +=data[prop];
  
  }

  const searchParams = querystring.stringify(data);

  const browser = await puppeteer.launch({headless: true});

  const page = await browser.newPage();

  //const content = await got('https://www.olx.ua/nedvizhimost/kvartiry-komnaty/arenda-kvartir-komnat/odessa/?' + searchParams);

  //await page.goto('https://dom.ria.com/uk/search/#links-under-filter=on&category=1&realty_type=0&operation_type=3&fullCategoryOperation=1_0_3&page=0&state_id=12&city_id=12&limit=30&sort=inspected_sort&period=0&csrf=KTIekYBV-KYClCWoJX0xVeJwlnkIXXLGNLa4&d_id=15250:15810:15815:17789:17854:17855:17856:17857:17858&ch=235_f_5500,235_t_6000,246_244');
  
  await page.goto('https://ua.igotoworld.com/ua/tours_catalog/tours.htm');

  const content = await page.content();

  const $ = cheerio.load(content);

  $('#newsListItemsHolder .newsListItem').each(async(idx, elem) => {
    
    //const title = $(elem).find('.title-cell a').text().replace(/(\r\n|\n|\r)/gm, "").replace(/\s{2,}/g, ' ');
    //const price = $(elem).find('p.price').text().replace(/(\r\n|\n|\r)/gm, "").replace(/\s{2,}/g, ' ');
    try{

    } catch(err){
      console.log(err)
    }
    let link = $(elem).find('.newsListItemTextShort a').attr('href');
    
    const browser2 = await puppeteer.launch({headless: true});
    
    const pageTour = await browser2.newPage();

    await pageTour.goto(link);

    const contentTour = await pageTour.content();

    //console.log(link ,$(contentTour).find('.tour-details-item'))
    console.log(link)
/*
    let email = $('.newsListItemTextShort a').attr('href');

    articles.push({
      link,
      source : 'igotoworld'
    });*/
    //console.log(link);
    browser2.close();

  })
  
  browser.close();

  return JSON.stringify(articles);
}

