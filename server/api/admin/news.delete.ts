import { requireAdmin } from '../../utils/admin-auth'
import { deleteNewsFile } from '../../utils/news-store'

export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const q = getQuery(event)
  const slug = typeof q.slug === 'string' ? q.slug : ''
  if (!slug.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Missing ?slug=' })
  }
  await deleteNewsFile(slug.trim())
  return { ok: true }
})
