import s from "./main.module.scss"
import {NewsBanner} from "../../components/NewsBanner/NewsBanner.tsx";
import {getNews} from "../../api/apiNews.ts";
import {useEffect, useState} from "react";
import type {NewsApiResponse, NewsCategoryType} from "../../types/NewsResponse.ts";
import {Skeleton} from "../../components/Skeleton/Skeleton.tsx";
import {NewsList} from "../../components/NewsLIst/NewsList.tsx";
import {Pagination} from "../../components/Pagination/Pagination.tsx";
import {Category} from "../../components/Category/Category.tsx";
import {Search} from "../../components/Search/Search.tsx";
import {useDeferred} from "../../helpers/hooks/useDeferred.ts";

export const Main = () => {
  const [news, setNews] = useState<NewsApiResponse>()
  const [loading, setLoading] = useState(true)

  // token текущей страницы API (токен, НЕ номер)
  const [currentToken, setCurrentToken] = useState<string | null>()

  // массив всех токенов по страницам
  // pageTokens[0] === ""  (страница 1)
  const [pageTokens, setPageTokens] = useState<string[]>([""])

  const [currentPage, setCurrentPage] = useState(1);

  // Кол-во кнопок — рисуем просто UI
  const totalCount = 10

  // Загрузка новостей по токену
  const fetchNews = async () => {
    try {
      setLoading(true)

      const response = await getNews(currentToken, categories, deferredWord);
      setNews(response);

      // если это НЕ последняя страница и токен ещё не сохранён — добавляем
      if (response.nextPage && !pageTokens.includes(response.nextPage)) {
        setPageTokens(prev => [...prev, response.nextPage]);
      }

      setLoading(false)

    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false)
    }
  }

  // вызывается при клике на номер страницы
  const goToPage = (pageNumber: number) => {
    const token = pageTokens[pageNumber - 1]; // -1 т.к. индексация 0-based
    setCurrentToken(token);
    setCurrentPage(pageNumber);
  };

  // Вперёд — используем токен nextPage
  const handleNext = () => {
    if (!news?.nextPage) return

    setCurrentToken(news.nextPage);
    setCurrentPage(prev => prev + 1);
  }

  const handlePrev = () => {
    if (currentPage <= 1) return;

    const previousToken = pageTokens[currentPage - 2]; // -2 потому что page-1, и индексация 0-based
    setCurrentToken(previousToken);
    setCurrentPage(prev => prev - 1);
  };

  const [categories, setCategories] = useState<NewsCategoryType | null>(null)

  const handleCategoryChange = (category: NewsCategoryType) => {
    if (category === categories) {
      setCategories(null)
    } else {
      setCategories(category)
    }
  }

  const [keyword, setKeyword] = useState<string | number | readonly string[] | undefined>(undefined)

  const handleKeyword = (word: string) => {
    if (word === '') {
      console.log(word)
      return
    } else {
      setKeyword(word)
      console.log(word)
    }
  }
  // Задержка в 1.5сек в поиске
  const deferredWord = useDeferred(keyword, 1500)

  useEffect(() => {
      fetchNews()
    }, [currentToken, categories, deferredWord]
  );

  // Если нет новостей
  if (!news?.results || news.results.length === 0) {
    return <main className={s.main}>
      <Skeleton type="banner" count={1}/>
      <Skeleton count={10}/>
    </main>
  }

  return (
    <main className={s.main}>
      <Search keyword={keyword} setKeyword={handleKeyword}/>

      <Category categories={categories || null} setCategory={handleCategoryChange}/>

      {loading ? <Skeleton type="banner" count={1}/> : <NewsBanner news={news.results}/>}

      <Pagination
        totalCount={totalCount}
        currentPage={currentPage}
        onNext={handleNext}
        onPrev={handlePrev}
        goToPage={goToPage}
        hasNext={!!news.nextPage}
        hasPrev={currentPage > 1}
      />

      {loading ? <Skeleton count={10}/> : <NewsList news={news.results}/>}

      <Pagination
        totalCount={totalCount}
        currentPage={currentPage}
        onNext={handleNext}
        onPrev={handlePrev}
        goToPage={goToPage}
        hasNext={!!news.nextPage}
        hasPrev={currentPage > 1}
      />
    </main>
  );
};