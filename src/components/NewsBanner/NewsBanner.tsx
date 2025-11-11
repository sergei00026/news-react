import s from './newsBanner.module.scss'
import type {Article} from "../../types/NewsResponse.ts";
import {Image} from "../Image/Image.tsx";
import {formatTimeAgo} from "../../helpers/formatTimeAgo.ts";

type Props = {
  news: Article[]
}

export const NewsBanner = ({news}: Props) => {

  return (
    <div className={s.newsBanner}>
      <Image item={news[0].image_url || undefined}/>
      <h2 className={s.title}>{news[0].title}</h2>
      <p className={s.date}>{formatTimeAgo(news[0].pubDate)} as {news[0].creator}</p>
    </div>
  );
};