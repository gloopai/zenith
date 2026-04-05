import type { Ref } from 'vue'

/** Pass current UI locale to JSON APIs that localize tools, news, and OpenClaw content. */
export function useContentApiLocale(): { locale: Ref<string>; query: Ref<{ locale: string }> } {
  const { locale } = useI18n()
  const query = computed(() => ({ locale: locale.value }))
  return { locale, query }
}
