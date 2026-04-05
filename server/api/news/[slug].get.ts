import { getRequestContentLocale } from '../../utils/content-locale'
import { getNewsBySlug } from '../../utils/news-store'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing slug' })
  }
  const locale = getRequestContentLocale(event)
  const article = await getNewsBySlug(slug, locale)
  if (!article) {
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }
  return { article }
})
