import noImgage from '@/assets/images/no-image.jpg'

import appConfig from '@/config/app.config'

export const getUploadUrl = (url: string | undefined, defualtUrl?: string) => {
  if (url) {
    return appConfig.uploadsUrl + url
  } else {
    return defualtUrl || noImgage
  }
}
