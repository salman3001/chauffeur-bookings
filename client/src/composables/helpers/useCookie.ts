import { useCookies } from '@vueuse/integrations/useCookies'

export const useCookie = () => {
  const cookies = useCookies(['user'])
  return cookies
}
