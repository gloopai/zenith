import { getHeader } from 'h3'
import type { H3Event } from 'h3'

export function requireAdmin(event: H3Event) {
  const config = useRuntimeConfig(event)
  const secret = config.adminSecret as string
  if (!secret) {
    throw createError({ statusCode: 503, statusMessage: 'Admin is not configured on this server' })
  }
  const auth = getHeader(event, 'authorization') ?? ''
  const token = auth.replace(/^Bearer\s+/i, '').trim()
  if (token !== secret) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
}
