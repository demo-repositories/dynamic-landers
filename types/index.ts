import type { PortableTextBlock } from '@portabletext/types'
import type { Image } from 'sanity'

export interface MenuItem {
  _type: string
  slug?: string
  title?: string
}

export interface Location {
  _type: string
  slug?: string
  title?: string
}

export interface ShowcaseCuisine {
  _type: string
  coverImage?: Image
  slug: string
  tags?: string[]
  title?: string
}

export interface SEO {
  description?: string
  image?: Image
  title?: string
  noIndex?: boolean
}

// Page payloads

export interface HomePagePayload {
  footer?: PortableTextBlock[]
  overview?: PortableTextBlock[]
  showcaseCuisines?: ShowcaseCuisine[]
  title?: string
  locations?: Location[]
  seo?: SEO
}

export interface LocationPayload {
  name?: string
  overview?: PortableTextBlock[]
  title?: string
  h1?: string
  slug?: string
  seo?: SEO
  cuisines?: ShowcaseCuisine[]
  cuisineCount?: number
  reviews?: number
  reviewAverage?: number
  population?: number
  joined?: string
  partners?: number
}

export interface CuisinePayload {
  coverImage?: Image
  description?: PortableTextBlock[]
  slug: string
  title?: string
  seo?: SEO
  locations?: Location[]
}

export interface LocationCuisinePayload {
  location: LocationPayload
  cuisine: CuisinePayload
  title?: string
  h1?: string
  seo?: SEO
}

export interface SettingsPayload {
  footer?: PortableTextBlock[]
  menuItems?: MenuItem[]
  ogImage?: Image
}
