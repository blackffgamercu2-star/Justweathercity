import NodeCache from "node-cache"

const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 })

export const getFromCache = (key: string) => {
  return cache.get(key)
}

export const setInCache = (key: string, value: any, ttl?: number) => {
  cache.set(key, value, ttl)
}

export const clearCache = (key: string) => {
  cache.del(key)
}
