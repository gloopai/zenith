import { getOpenClawSkillBySlug, readOpenclawSkills } from '../../utils/openclaw-skills-store'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing slug' })
  }
  const skills = await readOpenclawSkills()
  const skill = getOpenClawSkillBySlug(skills, slug)
  if (!skill) {
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }
  return { skill }
})
