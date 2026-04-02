import { readOpenclawSkills } from '../../utils/openclaw-skills-store'

export default defineEventHandler(async () => {
  const skills = await readOpenclawSkills()
  return { skills }
})
