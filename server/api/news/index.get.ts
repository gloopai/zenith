import { listNewsMeta } from '../../utils/news-store'

export default defineEventHandler(async () => {
  const items = await listNewsMeta()
  return { items }
})
