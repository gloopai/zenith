import { getToolBySlug, readTools } from '../../utils/tools-store'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing slug' })
  }
  const tools = await readTools()
  const tool = getToolBySlug(tools, slug)
  if (!tool) {
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }
  return { tool }
})
