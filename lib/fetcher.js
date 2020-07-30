import { get } from 'axios'

export const JSONfetcher = async (url) => {
  const data = await get(url, { withCredentials: true }) // Send credentials by default
  return data
}
