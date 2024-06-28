import noImgage from '~/assets/images/no-image.png'

export default function useGetImageUrl() {
  const getImageUrl = (url: string | undefined, defualtUrl?: string) => {
    if (url) {
      return import.meta.env.BASE_URL + 'uploads/' + url
    } else {
      return defualtUrl || noImgage
    }
  }

  return getImageUrl
}
