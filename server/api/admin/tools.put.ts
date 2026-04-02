import type { Tool } from '~~/shared/types/site'
import { requireAdmin } from '../../utils/admin-auth'
import { writeTools } from '../../utils/tools-store'

export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const body = await readBody<{ tools: Tool[] }>(event)
  if (!body?.tools || !Array.isArray(body.tools)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid body: expected { tools: Tool[] }' })
  }
  for (const t of body.tools) {
    if (!t.slug || !t.name || !t.description || !t.url || !t.category) {
      throw createError({ statusCode: 400, statusMessage: 'Each tool requires slug, name, description, url, category' })
    }
  }
  await writeTools(body.tools)
  return { ok: true }
})
