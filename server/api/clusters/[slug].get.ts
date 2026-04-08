import { getRequestContentLocale } from '../../utils/content-locale'
import { readClusterDetail } from '../../utils/clusters-store'

export default defineEventHandler(async (event) => {
  const slug = String(event.context.params?.slug ?? '')
  const locale = getRequestContentLocale(event)
  const cluster = await readClusterDetail(slug, locale)
  if (!cluster) {
    throw createError({ statusCode: 404, statusMessage: 'Cluster not found' })
  }
  return { cluster }
})
