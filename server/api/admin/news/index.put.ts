import { requireAdmin } from '../../../utils/admin-auth'
import { writeNewsFile } from '../../../utils/news-store'

export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const body = await readBody<{
    slug: string
    title: string
    description: string
    date: string
    body: string
  }>(event)
  if (!body?.slug || !body.title || !body.description || !body.date || body.body === undefined) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid body: slug, title, description, date, body are required',
    })
  }
  await writeNewsFile({
    slug: body.slug.trim(),
    title: body.title.trim(),
    description: body.description.trim(),
    date: body.date.trim(),
    body: body.body,
  })
  return { ok: true }
})
