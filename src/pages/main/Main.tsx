import s from "./main.module.scss"
import {NewsBanner} from "../../components/NewsBanner/NewsBanner.tsx";
import {getNews} from "../../api/apiNews.ts";
import {useEffect, useState} from "react";
import type {NewsApiResponse} from "../../types/NewsResponse.ts";
import {NewsList} from "../../components/Header/NewsLIst/NewsList.tsx";

export const Main = () => {
  const [news, setNews] = useState<NewsApiResponse>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {

      const fetchData = async () => {
        try {
          const responce = await getNews();
          setLoading(false)
          setNews(responce);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false)
        }
      }
      fetchData()
    }, []
  );

  if (loading) {
    return <div>Loading...</div>;
  }
  // Если нет новостей
  if (!news?.results || news.results.length === 0) {
    return <div className={s.main}>No news available</div>
  }


  return (
    <main className={s.main}>
      <NewsBanner news={news.results}/>
      <NewsList news={news.results}/>
    </main>
  );
};