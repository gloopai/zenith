import { getRequestContentLocale } from '../../utils/content-locale'
import { getMcpServerBySlug, readMcpServersLocalized } from '../../utils/mcp-servers-store'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing slug' })
  }
  const locale = getRequestContentLocale(event)
  const servers = await readMcpServersLocalized(locale)
  const server = getMcpServerBySlug(servers, slug)
  if (!server) {
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }
  return { server }
})
