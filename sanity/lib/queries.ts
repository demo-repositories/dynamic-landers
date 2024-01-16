import { groq } from 'next-sanity'

export const SEO = groq`
  "seo": {
    "description": seo.description,
    "image": seo.image,
    "title": coalesce(seo.title, title),
    "noIndex": seo.noIndex,
  }
`

export const homePageQuery = groq`
  *[_type == "home"][0]{
    _id,
    overview,
    showcaseCuisines[]->{
      _type,
      coverImage,
      overview,
      "slug": slug.current,
      tags,
      title,
    },
    title,
    "locations": *[_type == "location"] {
      _type,
      title,
      "slug" : slug.current,
    },
    ${SEO}
  }
`

export const locationBySlugQuery = groq`
  *[_type == "location" && slug.current == $slug][0] {
    _id,
    body,
    overview,
    title,
    "slug": slug.current,
    population,
    joined,
    partners,
    cuisines[],
    reviews,
    reviewAverage,
    seo,
    'locationSettings': *[_type == 'locationSettings'][0] {
      title,
      overview,
      seo,
    }
  } {
    ...,
    "h1": locationSettings.title,
    "overview": coalesce(overview, locationSettings.overview),
    "seo": {
      "title": coalesce(seo.title, locationSettings.seo.title),
      "description": coalesce(seo.description, locationSettings.seo.description),
      "image": coalesce(seo.image, locationSettings.seo.image),
      "noIndex": coalesce(seo.noIndex, locationSettings.seo.noIndex),
    }
  }
`

export const cuisineBySlugQuery = groq`
  *[_type == "cuisine" && slug.current == $slug][0] {
    _id,
    coverImage,
    description,
    "slug": slug.current,
    title,
    ${SEO},
    "locations": *[_type == "location" && references(^._id)] {
      _type,
      title,
      "slug" : slug.current,
    }
  }
`

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    footer,
    menuItems[]->{
      _type,
      "slug": slug.current,
      title
    },
    ogImage,
  }
`
