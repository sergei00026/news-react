import s from './image.module.scss'

type Props = {
  item?: string
  className?: string
}

export const Image = ({item, className}: Props) => {
  console.log(s)
  return (
    <div className={s.wrapper}>
      {item &&
          <img
              src={item}
              className={`${s.image} ${className === undefined ? '' : className}`}
              alt="image"
          />
      }
    </div>
  );
};