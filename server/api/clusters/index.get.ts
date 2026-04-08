import { getRequestContentLocale } from '../../utils/content-locale'
import { listClustersLocalized } from '../../utils/clusters-store'

export default defineEventHandler(async (event) => {
  const locale = getRequestContentLocale(event)
  const clusters = await listClustersLocalized(locale)
  return { clusters }
})
