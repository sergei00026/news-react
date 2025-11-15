import axios from "axios";
import {type NewsCategoryType} from '../types/NewsResponse'

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = import.meta.env.VITE_NEWS_BASE_URL;

export async function getNews(token: string | null | undefined, category?: NewsCategoryType | null) {
  try {
    const response = await axios.get(`${BASE_URL}latest`, {
      params: {
        apikey: API_KEY,
        page: token || undefined,
        category

      }
    });
    return await response.data;
  } catch (error) {
    console.log(error);
  }
}

