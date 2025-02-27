
import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'


export  function chatHrefConstructor(id1,id2) {
  console.log(id1,id2,"from chatroutfun")
  const sortedIds = [id1, id2].sort()
  return `${sortedIds[0]}--${sortedIds[1]}`
}





export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function toPusherKey(key) {
  return key.replace(/:/g, '__')
}