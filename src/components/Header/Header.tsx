import s from "./header.module.scss"
import {formatDate} from "../../helpers/formatData.ts";


export const Header = () => {
  return (
    <header className={s.header}>
      <h1 className={s.title}>        Новости      </h1>
      <p>{formatDate(new Date())}</p>
    </header>
  );
};