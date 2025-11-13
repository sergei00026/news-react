import s from "./newsItem.module.scss"
import type {Article} from "../../../types/NewsResponse.ts";
import {formatTimeAgo} from "../../../helpers/formatTimeAgo.ts";

type Props = {
  item: Article
};
export const NewsItem = ({item}: Props) => {
  return (
    <li className={s.item}>
      <div className={s.image} style={{backgroundImage: `url(${item.image_url})`}}></div>
      <div className={s.box}>
        <h3 className={s.title}>{item.title}</h3>
        <p className={s.date}>{formatTimeAgo(item.pubDate)}</p>
      </div>
    </li>
  );
};