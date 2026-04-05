import type { ComputedRef, Ref } from 'vue'
import { I18N_DEFAULT_LOCALE } from '~~/shared/i18n-public'

/** Pass current UI locale to JSON APIs that localize tools, news, and OpenClaw content. */
export function useContentApiLocale(): { locale: Ref<string>; query: ComputedRef<{ locale: string }> } {
  const { locale } = useI18n()
  const query = computed(() => ({
    locale: (typeof locale.value === 'string' && locale.value ? locale.value : I18N_DEFAULT_LOCALE),
  }))
  return { locale, query }
}
