//Отложенный запрос
import {useEffect, useState} from "react";

export const useDeferred = (value: string | number | readonly string[] | undefined, delay: number) => {
  const [deferred, setDeferred] = useState(value)

  useEffect(()=>{
    const handler = setTimeout(() => {
      setDeferred(value)
    }, delay);
    return () => clearTimeout(handler);
  },[value, delay])

  return deferred
}