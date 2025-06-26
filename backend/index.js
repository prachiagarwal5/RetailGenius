require('dotenv').config();
const database = require('./services/database.js');
const { scrapeAmazon } = require('./services/scrapper.js');

// Products to scrape (customize this list)
const products = ['wireless earbuds', 'yoga mat', 'blender'];

(async () => {
  await database.connectDB();

  // Scrape all products sequentially
  for (const product of products) {
    await scrapeAmazon(product);
  }

  console.log('Scraping completed!');
  process.exit(0);
})();