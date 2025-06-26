const puppeteer = require('puppeteer');
const CompetitorPrice = require('../models/Competitor');

const scrapeAmazon = async (productName) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
  
  try {
    await page.goto(`https://www.amazon.com/s?k=${encodeURIComponent(productName)}`, { waitUntil: 'domcontentloaded' });
    
    const data = await page.evaluate(() => {
      const items = document.querySelectorAll('.s-result-item');
      return Array.from(items).map(item => ({
        title: item.querySelector('h2')?.innerText.trim(),
        price: parseFloat(item.querySelector('.a-price-whole')?.innerText.replace(',', '') || '0'),
      })).filter(item => item.title && item.price > 0);
    });

    // Save to MongoDB
    await CompetitorPrice.insertMany(
      data.map(item => ({
        productId: productName.toLowerCase().replace(/\s+/g, '-'),
        competitor: 'Amazon',
        price: item.price
      }))
    );

    console.log(`Saved ${data.length} Amazon prices for ${productName}`);
  } catch (err) {
    console.error('Scraping failed:', err);
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeAmazon };