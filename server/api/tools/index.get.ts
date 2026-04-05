import { getRequestContentLocale } from '../../utils/content-locale'
import { readToolsLocalized } from '../../utils/tools-store'

export default defineEventHandler(async (event) => {
  const locale = getRequestContentLocale(event)
  const tools = await readToolsLocalized(locale)
  return { tools }
})
