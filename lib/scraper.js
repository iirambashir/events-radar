import * as cheerio from 'cheerio';

// Example scraper - you'll customize this for real sites
export async function scrapeEvents() {
  console.log('🔍 Starting scraper...');
  
  // SAMPLE: Replace with real event website
  const url = 'https://www.eventbrite.com/d/online/free--events/';
  
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const html = await response.text();
    const $ = cheerio.load(html);
    
    const events = [];
    
    // TODO: Customize selectors for your target website
    // This is just an example structure
    $('.event-card').each((i, el) => {
      const title = $(el).find('.event-title').text().trim();
      const dateStr = $(el).find('.event-date').text().trim();
      const location = $(el).find('.event-location').text().trim();
      const description = $(el).find('.event-description').text().trim();
      const link = $(el).find('a').attr('href');
      const imageUrl = $(el).find('img').attr('src');
      
      if (title && dateStr) {
        events.push({
          title,
          date: new Date(dateStr),
          location: location || 'TBA',
          description: description || '',
          link: link || url,
          source: 'Eventbrite',
          category: 'Other',
          imageUrl: imageUrl || null
        });
      }
    });
    
    console.log(`✅ Found ${events.length} events`);
    return events;
    
  } catch (error) {
    console.error('❌ Scraping error:', error);
    return [];
  }
}

// Helper: Scrape multiple sources
export async function scrapeAllSources() {
  const allEvents = [];
  
  // Add more scrapers here
  const events1 = await scrapeEvents();
  allEvents.push(...events1);
  
  // Remove duplicates
  const uniqueEvents = allEvents.filter((event, index, self) =>
    index === self.findIndex((e) => e.title === event.title && e.date === event.date)
  );
  
  return uniqueEvents;
}