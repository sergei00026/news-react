export interface Article {
  article_id: string;
  link: string;
  title: string;
  description: string;
  content: string;
  keywords: string[] | null;
  creator: string[] | null;
  language: string;
  country: string[];
  category: string[];
  pubDate: string; // или Date, если парсить через new Date()
  pubDateTZ: string;
  image_url: string | null;
  video_url: string | null;
  source_id: string;
  source_name: string;
  source_priority: number;
  source_url: string;
  source_icon: string | null;
  sentiment: string;
  sentiment_stats: string;
  ai_tag: string;
  ai_region: string;
  ai_org: string;
  ai_summary: string;
  duplicate: boolean;
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  results: Article[];
}
