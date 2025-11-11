import axios from "axios";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = import.meta.env.VITE_NEWS_BASE_URL;

export async function getNews() {
  try {
    const response = await axios.get(`${BASE_URL}latest`, {
      params: {
        apikey: API_KEY
      }
    });
    return await response.data;
  } catch (error) {
    console.log(error);
  }
}

