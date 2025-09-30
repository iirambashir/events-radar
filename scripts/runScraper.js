import { connectDB } from '../lib/db.js';
import Event from '../models/Event.js';
import { scrapeAllSources } from '../lib/scraper.js';

async function main() {
  try {
    console.log('🚀 Starting scraper script...');
    
    // Connect to database
    await connectDB();
    console.log('✅ Connected to MongoDB');
    
    // Scrape events
    const events = await scrapeAllSources();
    console.log(`📊 Scraped ${events.length} events`);
    
    if (events.length === 0) {
      console.log('⚠️  No events found');
      return;
    }
    
    // Insert events (skip duplicates)
    let inserted = 0;
    let skipped = 0;
    
    for (const event of events) {
      try {
        await Event.create(event);
        inserted++;
      } catch (error) {
        if (error.code === 11000) {
          // Duplicate event
          skipped++;
        } else {
          console.error('Error inserting event:', error.message);
        }
      }
    }
    
    console.log(`✅ Inserted: ${inserted}, Skipped duplicates: ${skipped}`);
    console.log('🎉 Scraping complete!');
    
  } catch (error) {
    console.error('❌ Script error:', error);
  } finally {
    process.exit();
  }
}

main();