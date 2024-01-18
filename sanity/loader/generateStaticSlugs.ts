import 'server-only'

import { groq } from 'next-sanity'

import { client } from '@/sanity/lib/client'
import { token } from '@/sanity/lib/token'

// Used in `generateStaticParams`
export function generateStaticSlugs(type: string) {
  if (type == 'locationCuisine') {
    return client
      .withConfig({
        token,
        perspective: 'published',
        useCdn: false,
        stega: false,
      })
      .fetch<string[]>(
        groq`*[_type == 'location' && defined(slug.current)] {
          cuisines[]->{
            "cuisine": slug.current,
            "location": ^.slug.current
          }
        }.cuisines[]`,
      )
  }

  if (type == 'location') {
    return client
      .withConfig({
        token,
        perspective: 'published',
        useCdn: false,
        stega: false,
      })
      .fetch<string[]>(
        groq`*[_type == $type && defined(slug.current)]{"location": slug.current}`,
        { type },
      )
  }

  // Not using loadQuery as it's optimized for fetching in the RSC lifecycle
  return client
    .withConfig({
      token,
      perspective: 'published',
      useCdn: false,
      stega: false,
    })
    .fetch<string[]>(
      groq`*[_type == $type && defined(slug.current)]{"slug": slug.current}`,
      { type },
    )
}
