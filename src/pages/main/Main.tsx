import s from "./main.module.scss"
import {NewsBanner} from "../../components/NewsBanner/NewsBanner.tsx";
import {getNews} from "../../api/apiNews.ts";
import {useEffect, useState} from "react";
import type {NewsApiResponse} from "../../types/NewsResponse.ts";
import {Skeleton} from "../../components/Skeleton/Skeleton.tsx";
import {NewsList} from "../../components/NewsLIst/NewsList.tsx";
import {Pagination} from "../../components/Pagination/Pagination.tsx";

export const Main = () => {
  const [news, setNews] = useState<NewsApiResponse>()
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const totalCount = 10

  const fetchData = async () => {
    try {
      setLoading(true)

      const response = await getNews(currentPage);

      setNews(response);
      setLoading(false)

    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false)
    }
  }

  useEffect(() => {
      fetchData()
    }, [currentPage]
  );

  // Если нет новостей
  if (!news?.results || news.results.length === 0) {
    return <div className={s.main}>No news available</div>
  }


  return (
    <main className={s.main}>
      {loading ? <Skeleton type="banner" count={1}/> : <NewsBanner news={news.results}/>}
      <Pagination totalCount={totalCount} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      {loading ? <Skeleton count={10}/> : <NewsList news={news.results}/>}
    </main>
  );
};