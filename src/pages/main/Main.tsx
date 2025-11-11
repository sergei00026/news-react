import s from "./main.module.scss"
import {NewsBanner} from "../../components/NewsBanner/NewsBanner.tsx";
import {getNews} from "../../api/apiNews.ts";
import {useEffect, useState} from "react";
import type {NewsApiResponse} from "../../types/NewsResponse.ts";
import {NewsList} from "../../components/Header/NewsLIst/NewsList.tsx";
import {Skeleton} from "../../components/Skeleton/Skeleton.tsx";

export const Main = () => {
  const [news, setNews] = useState<NewsApiResponse>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {

      const fetchData = async () => {
        try {
          setLoading(true)
          const responce = await getNews();

          setNews(responce);
          setLoading(false)
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false)
        }
      }
      fetchData()
    }, []
  );

  // Если нет новостей
  if (!news?.results || news.results.length === 0) {
    return <div className={s.main}>No news available</div>
  }


  return (
    <main className={s.main}>
      {loading ? <Skeleton type="banner" count={1}/> : <NewsBanner news={news.results}/>}
      {loading ? <Skeleton count={10}/> : <NewsList news={news.results}/>}
    </main>
  );
};