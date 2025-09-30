import { scrapeAllSources } from '../lib/scraper.js';

async function test() {
  console.log('🔍 Testing scraper without database...');
  const events = await scrapeAllSources();
  console.log(`📊 Found ${events.length} events:`);
  console.log(JSON.stringify(events, null, 2));
}

test();