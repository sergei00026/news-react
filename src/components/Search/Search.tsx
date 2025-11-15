import s from "./search.module.scss"
import type {ChangeEvent} from "react";

type Props = {
  setKeyword: (word: string) => void
  keyword: string | number | readonly string[] | undefined
}

export const Search = (props: Props) => {
  const {keyword, setKeyword} = props

  const handleKeyword = (e:  ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value)
  }
  return (
    <div className={s.search}>
      <input
        className={s.input}
        value={keyword }
        onChange={handleKeyword}
        placeholder={'Search'}
      />
    </div>
  );
};