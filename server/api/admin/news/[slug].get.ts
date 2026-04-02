import { requireAdmin } from '../../../utils/admin-auth'
import { getNewsEditorPayload } from '../../../utils/news-store'

export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing slug' })
  }
  const payload = await getNewsEditorPayload(slug)
  if (!payload) {
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }
  return payload
})
