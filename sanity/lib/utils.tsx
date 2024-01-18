import { vercelStegaCleanAll } from '@sanity/client/stega'
import createImageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'

import { dataset, projectId } from '@/sanity/lib/api'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source: Image | undefined) => {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined
  }

  return imageBuilder?.image(source).auto('format').fit('max')
}

export function urlForOpenGraphImage(image: Image | undefined) {
  return urlForImage(image)?.width(1200).height(627).fit('crop').url()
}

export function resolveHref(
  documentType?: string,
  slug?: string,
  segments?: string[],
): string | undefined {
  switch (documentType) {
    case 'home':
      return '/'
    case 'page':
      return slug ? `/${slug}` : undefined
    case 'cuisine':
      return slug ? `/nearme/${slug}` : undefined
    case 'location':
      return slug ? `/${slug}` : undefined
    case 'locationCuisine':
      return slug ? `/${slug}/${segments?.join('/')}` : undefined
    default:
      console.warn('Invalid document type:', documentType)
      return undefined
  }
}

export function placeholderReplace(string?: string | null, data?: any) {
  const replacement = string?.replace(/\{(\w+)\}/g, (match, key) => {
    const value = vercelStegaCleanAll(data?.[key])
    return value || match
  })

  return replacement
}

export function filterObjectKeys<T extends object, K extends keyof T>(
  obj: T,
  whitelist: K[],
): Pick<T, K> {
  const filteredObj: Partial<T> = {}

  Object.keys(obj).forEach((key) => {
    if (whitelist.includes(key as K)) {
      filteredObj[key as K] = obj[key as K]
    }
  })

  return filteredObj as Pick<T, K>
}
