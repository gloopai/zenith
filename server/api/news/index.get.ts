import { getRequestContentLocale } from '../../utils/content-locale'
import { listNewsMeta } from '../../utils/news-store'
import type { NewsListResponse } from '~~/shared/types/site'

function parsePositiveInt(v: unknown, fallback: number): number {
  const raw = Array.isArray(v) ? v[0] : v
  const n = typeof raw === 'string' || typeof raw === 'number' ? parseInt(String(raw), 10) : NaN
  return Number.isFinite(n) && n > 0 ? n : fallback
}

export default defineEventHandler(async (event) => {
  const locale = getRequestContentLocale(event)
  const query = getQuery(event)

  const items = await listNewsMeta(locale)
  const total = items.length

  const limit = parsePositiveInt(query.limit, 0)
  if (limit > 0) {
    const slice = items.slice(0, limit)
    const body: NewsListResponse = { items: slice, total }
    return body
  }

  const hasPage = query.page !== undefined && query.page !== ''
  const hasPageSize = query.pageSize !== undefined && query.pageSize !== ''

  if (!hasPage && !hasPageSize) {
    const body: NewsListResponse = { items, total }
    return body
  }

  const pageSize = Math.min(50, Math.max(1, parsePositiveInt(query.pageSize, 12)))
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  let page = parsePositiveInt(query.page, 1)
  page = Math.min(page, totalPages)

  const start = (page - 1) * pageSize
  const slice = items.slice(start, start + pageSize)

  const body: NewsListResponse = {
    items: slice,
    total,
    page,
    pageSize,
    totalPages,
  }
  return body
})
