import s from "./skeleton.module.scss"
type Props = {
  type?: string
  count?: number
}

export const Skeleton = ({count = 1, type = 'banner'}: Props) => {
  return (
    <>
      {
        count > 1 ? (
          <ul className={s.list}>
            {[...Array(count)].map((_, index) =>
              (
                <li className={s.item} key={index}></li>
              ))}

          </ul>
        ) : (
          <div className={type === 'banner' ? s.banner : s.item}></div>
        )
      }
    </>
  );
};