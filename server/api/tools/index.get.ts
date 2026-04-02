import { readTools } from '../../utils/tools-store'

export default defineEventHandler(async () => {
  const tools = await readTools()
  return { tools }
})
