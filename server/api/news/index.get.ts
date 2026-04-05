import { getRequestContentLocale } from '../../utils/content-locale'
import { listNewsMeta } from '../../utils/news-store'

export default defineEventHandler(async (event) => {
  const locale = getRequestContentLocale(event)
  const items = await listNewsMeta(locale)
  return { items }
})
