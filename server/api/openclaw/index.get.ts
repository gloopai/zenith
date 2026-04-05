import { getRequestContentLocale } from '../../utils/content-locale'
import { readOpenclawSkillsLocalized } from '../../utils/openclaw-skills-store'

export default defineEventHandler(async (event) => {
  const locale = getRequestContentLocale(event)
  const skills = await readOpenclawSkillsLocalized(locale)
  return { skills }
})
