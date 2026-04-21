import { getRequestContentLocale } from '../../utils/content-locale'
import { readMcpServersLocalized } from '../../utils/mcp-servers-store'

export default defineEventHandler(async (event) => {
  const locale = getRequestContentLocale(event)
  const servers = await readMcpServersLocalized(locale)
  return { servers }
})
