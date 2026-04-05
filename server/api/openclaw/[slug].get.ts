import { getRequestContentLocale } from '../../utils/content-locale'
import { getOpenClawSkillBySlug, readOpenclawSkillsLocalized } from '../../utils/openclaw-skills-store'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing slug' })
  }
  const locale = getRequestContentLocale(event)
  const skills = await readOpenclawSkillsLocalized(locale)
  const skill = getOpenClawSkillBySlug(skills, slug)
  if (!skill) {
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }
  return { skill }
})
