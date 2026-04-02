export function useSiteOrigin() {
  const config = useRuntimeConfig()
  const requestUrl = useRequestURL()
  return computed(() => {
    const fromEnv = (config.public.siteUrl as string | undefined)?.trim()
    const base = (fromEnv || requestUrl.origin).replace(/\/$/, '')
    return base
  })
}
