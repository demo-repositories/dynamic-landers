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
    cuisines[]->{
      _type,
      coverImage,
      overview,
      "slug": slug.current,
      title,
    },
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
    "cuisineCount": count(cuisines),
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

export const locationCuisineBySlugQuery = groq`
{
  'locationCuisineSettings': *[_type == 'locationCuisineSettings'][0] {
    title,
    seo,
  },
  "location": *[_type == "location" && slug.current == $location][0] {
    _id,
    body,
    overview,
    title,
    "slug": slug.current,
    population,
    joined,
    partners,
    cuisines[]->{
      _type,
      coverImage,
      overview,
      "slug": slug.current,
      title,
    },
    reviews,
    reviewAverage,
    'locationSettings': *[_type == 'locationSettings'][0] {
      title,
      overview,
      seo,
    }
  } {
    ...,
    "overview": coalesce(overview, locationSettings.overview),
    "cuisineCount": count(cuisines),
  },
  "cuisine": *[_type == "cuisine" && slug.current == $cuisine][0] {
    _id,
    coverImage,
    description,
    "slug": slug.current,
    title,
  }
} {
  ...,
  "locationCuisine": *[_type == "locationCuisine" && location._ref == ^.location._id && cuisine._ref == ^.cuisine._id][0] {
    title,
    seo
  }
} {
    ...,
    "h1": coalesce(locationCuisine.title, locationCuisineSettings.title),
    "seo": {
      "title": coalesce(locationCuisine.seo.title, locationCuisineSettings.seo.title),
      "description": coalesce(locationCuisine.seo.description, locationCuisineSettings.seo.description),
      "image": coalesce(locationCuisine.seo.image, locationCuisineSettings.seo.image),
      "noIndex": coalesce(locationCuisine.seo.noIndex, locationCuisineSettings.seo.noIndex),
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
