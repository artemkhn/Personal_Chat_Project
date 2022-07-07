import { useEffect, useState } from 'react'

const PREFIX = 'user-'
export default function Storage( key, initialValue) {
  const prefixedKey = PREFIX + key;
  const [value, setValue] = useState(() => {
      const jsonValue = localStorage.getItem(prefixedKey)
      if(jsonValue != null) return JSON.parse(jsonValue)
        return initialValue
  })

  useEffect(() => {
      localStorage.setItem(prefixedKey, JSON.stringify(value))
  }, [prefixedKey, value]) 

  return [value, setValue]
}
