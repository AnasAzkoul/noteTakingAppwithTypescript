import {useEffect, useState} from 'react';

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [value, setValue] = useState<T>((): T => {
    const jsonValue = localStorage.getItem(key); 
    
    if (jsonValue === null) {
      if (typeof initialValue === 'function') {
        return (initialValue as () => T)()
      } else {
        return (JSON.stringify(initialValue) as T )
      }
      
    } else {
      return (JSON.parse(jsonValue) as T); 
    }
  })
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value)); 
  }, [value, setValue])
  
  
  return [value, setValue] as [T, typeof setValue]
}
