import { DisasterAlert, NewsUpdate } from "@/services/disaster-service";

// News API Integration
export async function fetchNewsAlerts(apiKey: string): Promise<DisasterAlert[]> {
  if (!apiKey) {
    console.warn("News API Key is missing. Please set NEXT_PUBLIC_NEWS_API_KEY in your .env file.");
    return [];
  }
  try {
    // Note: NewsAPI requires a registered domain for production. For development, localhost is usually allowed.
    // Make sure your API key is correctly set up in your .env file and accessible via process.env.NEXT_PUBLIC_NEWS_API_KEY
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=disaster OR emergency OR flood OR earthquake OR cyclone OR "heavy rain" OR heatwave&language=en&sortBy=publishedAt&pageSize=100&apiKey=${apiKey}`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error from News API:", errorData);
      return [];
    }

    const data = await response.json();
    
    return data.articles.map((article: any) => ({
      id: `news_${article.publishedAt}_${article.source.id || article.source.name}`,
      locationId: 'unknown', // News API doesn't provide precise location IDs, this would need further processing or Geo-coding
      type: determineDisasterType(article.title + " " + article.description),
      severity: determineSeverity(article.title + " " + article.description),
      description: article.description || "No description available.",
      source: article.source.name || "Unknown Source",
      timestamp: article.publishedAt,
      status: 'active',
      sourceUrl: article.url
    }));
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

// YouTube API Integration
export async function fetchYouTubeUpdates(apiKey: string, channelId: string): Promise<NewsUpdate[]> {
  if (!apiKey) {
    console.warn("YouTube API Key is missing. Please set NEXT_PUBLIC_YOUTUBE_API_KEY in your .env file.");
    return [];
  }
  if (!channelId) {
    console.warn("YouTube Channel ID is missing. Please set NEXT_PUBLIC_YOUTUBE_CHANNEL_ID in your .env file.");
    return [];
  }
  try {
    // Note: Ensure the YouTube Data API v3 is enabled in your Google Cloud Project.
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=10`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error from YouTube API:", errorData);
      return [];
    }

    const data = await response.json();
    
    return data.items.map((item: any) => ({
      id: `yt_${item.id.videoId}`,
      title: item.snippet.title,
      content: item.snippet.description,
      source: item.snippet.channelTitle || 'YouTube',
      timestamp: item.snippet.publishedAt,
      sourceUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`
    }));
  } catch (error) {
    console.error('Error fetching YouTube updates:', error);
    return [];
  }
}

// Weather API Integration
export async function fetchWeatherAlerts(apiKey: string): Promise<DisasterAlert[]> {
  if (!apiKey) {
    console.warn("Weather API Key is missing. Please set NEXT_PUBLIC_WEATHER_API_KEY in your .env file.");
    return [];
  }
  try {
    // Note: The latitude and longitude are currently hardcoded for a general area in India.
    // You might want to make this dynamic based on monitored locations.
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=20&lon=77&exclude=current,minutely,hourly&appid=${apiKey}`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error from OpenWeatherMap API:", errorData);
      return [];
    }

    const data = await response.json();
    
    return data.alerts?.map((alert: any) => ({
      id: `weather_${alert.start}_${alert.sender_name}`,
      locationId: 'weather_alert', // This would need refinement for specific locations
      type: 'Weather Alert',
      severity: determineWeatherSeverity(alert.severity),
      description: alert.event || alert.description || "No description available.",
      source: alert.sender_name || 'OpenWeatherMap',
      timestamp: new Date(alert.start * 1000).toISOString(),
      status: 'active',
      sourceUrl: undefined // OpenWeatherMap API alerts don't typically have a direct source URL
    })) || [];
  } catch (error) {
    console.error('Error fetching weather alerts:', error);
    return [];
  }
}

// Helper functions
function determineDisasterType(text: string): string {
  const textLower = text.toLowerCase();
  if (textLower.includes('flood')) return 'Flood';
  if (textLower.includes('earthquake')) return 'Earthquake';
  if (textLower.includes('cyclone')) return 'Cyclone';
  if (textLower.includes('heatwave')) return 'Heatwave';
  if (textLower.includes('rain')) return 'Heavy Rain';
  return 'Other';
}

function determineSeverity(text: string): 'high' | 'medium' | 'low' {
  const textLower = text.toLowerCase();
  if (textLower.includes('severe') || textLower.includes('critical') || textLower.includes('emergency')) {
    return 'high';
  }
  if (textLower.includes('warning') || textLower.includes('caution')) {
    return 'medium';
  }
  return 'low';
}

function determineWeatherSeverity(severity: string): 'high' | 'medium' | 'low' {
  switch (severity.toLowerCase()) {
    case 'extreme':
    case 'severe':
      return 'high';
    case 'moderate':
      return 'medium';
    default:
      return 'low';
  }
}

// Government Alert System Integration (Mock)
export async function fetchGovernmentAlerts(): Promise<DisasterAlert[]> {
  // This would be replaced with actual government API integration
  return [
    {
      id: 'gov_1',
      locationId: 'gov_alert',
      type: 'Government Alert',
      severity: 'high',
      description: 'Official emergency alert from government authorities',
      source: 'Government Alert System',
      timestamp: new Date().toISOString(),
      status: 'active'
    }
  ];
} 