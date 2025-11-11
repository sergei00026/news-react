import s from "./newsList.module.scss";
import type {Article} from "../../../types/NewsResponse.ts";
import {NewsItem} from "./NewsItem/NewsItem.tsx";

type Props = {
  news: Article[]
};
export const NewsList = ({news}: Props) => {
  return (
    <ul className={s.list}>
      {news.map(item => <NewsItem key={item.title} item={item}/>)}
    </ul>
  );
};