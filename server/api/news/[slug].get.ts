import { getNewsBySlug } from '../../utils/news-store'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing slug' })
  }
  const article = await getNewsBySlug(slug)
  if (!article) {
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }
  return { article }
})
