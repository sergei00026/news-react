import {NewsCategory, type NewsCategoryType} from "../../types/NewsResponse.ts";
import s from './category.module.scss'
import {useRef} from "react";
type Props = {
  setCategory: (category: NewsCategoryType) => void
  categories: NewsCategoryType | null
};
export const Category = (props: Props) => {
  const {setCategory, categories}= props

  const Categories = Object.values(NewsCategory)

  const ref = useRef<HTMLUListElement>(null);

  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!ref.current) return;
    isDown.current = true;
    startX.current = e.pageX - ref.current.offsetLeft;
    scrollLeft.current = ref.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
  };

  const handleMouseUp = () => {
    isDown.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !ref.current) return;
    e.preventDefault();

    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX.current) * 1; // скорость
    ref.current.scrollLeft = scrollLeft.current - walk;
  };


  return (
    <ul  className={s.category}
         ref={ref}
         onMouseDown={handleMouseDown}
         onMouseLeave={handleMouseLeave}
         onMouseUp={handleMouseUp}
         onMouseMove={handleMouseMove}
    >
      {
        Categories.map((category) => (
          <li className={s.item} key={category}>
            <button
              onClick={() => setCategory(category)}
              className={`${s.button} ${category === categories ? s.active : ''}`}>
              {category}
            </button>
          </li>
        ))
      }
    </ul>
  );
};