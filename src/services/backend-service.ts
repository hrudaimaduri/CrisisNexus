import { DisasterAlert, NewsUpdate } from "./disaster-service";
import {
  fetchNewsAlerts,
  fetchYouTubeUpdates,
  fetchWeatherAlerts,
  fetchGovernmentAlerts
} from "@/lib/api/integrations";

interface DataSource {
  id: string;
  name: string;
  type: 'news' | 'youtube' | 'weather' | 'government';
  url: string;
  apiKey?: string;
  lastFetched: string;
  status: 'active' | 'inactive';
}

class BackendService {
  private static instance: BackendService;
  private dataSources: DataSource[] = [];
  private isProcessing: boolean = false;
  private alerts: DisasterAlert[] = [];
  private updates: NewsUpdate[] = [];

  private constructor() {
    this.initializeDataSources();
  }

  static getInstance(): BackendService {
    if (!BackendService.instance) {
      BackendService.instance = new BackendService();
    }
    return BackendService.instance;
  }

  private initializeDataSources() {
    // Initialize with some default data sources
    this.dataSources = [
      {
        id: 'news1',
        name: 'Local News API',
        type: 'news',
        url: process.env.NEXT_PUBLIC_NEWS_API_URL || '',
        apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY,
        lastFetched: new Date().toISOString(),
        status: 'active'
      },
      {
        id: 'youtube1',
        name: 'Emergency Updates Channel',
        type: 'youtube',
        url: process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID || '',
        apiKey: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
        lastFetched: new Date().toISOString(),
        status: 'active'
      },
      {
        id: 'weather1',
        name: 'Weather API',
        type: 'weather',
        url: process.env.NEXT_PUBLIC_WEATHER_API_URL || '',
        apiKey: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
        lastFetched: new Date().toISOString(),
        status: 'active'
      }
    ];
  }

  async startDataProcessing() {
    if (this.isProcessing) return;
    this.isProcessing = true;

    try {
      // Process each data source
      for (const source of this.dataSources) {
        if (source.status === 'active') {
          await this.processDataSource(source);
        }
      }

      // Update last fetched timestamp for all sources
      this.dataSources = this.dataSources.map(source => ({
        ...source,
        lastFetched: new Date().toISOString()
      }));
    } catch (error) {
      console.error('Error processing data sources:', error);
    } finally {
      this.isProcessing = false;
    }
  }

  private async processDataSource(source: DataSource) {
    try {
      switch (source.type) {
        case 'news':
          if (source.apiKey) {
            const newsAlerts = await fetchNewsAlerts(source.apiKey);
            this.alerts = [...this.alerts, ...newsAlerts];
          }
          break;
        case 'youtube':
          if (source.apiKey && source.url) {
            const youtubeUpdates = await fetchYouTubeUpdates(source.apiKey, source.url);
            this.updates = [...this.updates, ...youtubeUpdates];
          }
          break;
        case 'weather':
          if (source.apiKey) {
            const weatherAlerts = await fetchWeatherAlerts(source.apiKey);
            this.alerts = [...this.alerts, ...weatherAlerts];
          }
          break;
        case 'government':
          const governmentAlerts = await fetchGovernmentAlerts();
          this.alerts = [...this.alerts, ...governmentAlerts];
          break;
      }
    } catch (error) {
      console.error(`Error processing ${source.type} source:`, error);
    }
  }

  // Data retrieval methods
  getActiveAlerts(): DisasterAlert[] {
    return this.alerts.filter(alert => alert.status === 'active');
  }

  getLatestUpdates(): NewsUpdate[] {
    return this.updates.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ).slice(0, 10);
  }

  getAlertHistory(startDate: string, endDate: string): DisasterAlert[] {
    return this.alerts.filter(alert => {
      const alertDate = new Date(alert.timestamp);
      return alertDate >= new Date(startDate) && alertDate <= new Date(endDate);
    });
  }

  // Admin methods
  async addDataSource(source: Omit<DataSource, 'id' | 'lastFetched'>) {
    const newSource: DataSource = {
      ...source,
      id: `source_${Date.now()}`,
      lastFetched: new Date().toISOString()
    };
    this.dataSources.push(newSource);
    return newSource;
  }

  async updateDataSource(id: string, updates: Partial<DataSource>) {
    const index = this.dataSources.findIndex(source => source.id === id);
    if (index !== -1) {
      this.dataSources[index] = { ...this.dataSources[index], ...updates };
      return this.dataSources[index];
    }
    return null;
  }

  async removeDataSource(id: string) {
    this.dataSources = this.dataSources.filter(source => source.id !== id);
  }

  getDataSources() {
    return this.dataSources;
  }
}

export const backendService = BackendService.getInstance(); 