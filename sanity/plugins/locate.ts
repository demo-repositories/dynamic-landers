import { map, Observable } from 'rxjs'
import {
  DocumentLocation,
  DocumentLocationResolver,
  DocumentLocationsState,
} from 'sanity/presentation'

import { resolveHref } from '@/sanity/lib/utils'

export const locate: DocumentLocationResolver = (params, context) => {
  if (params.type === 'settings') {
    return {
      message: 'This document is used on all pages',
      tone: 'caution',
    } satisfies DocumentLocationsState
  }

  if (params.type === 'home') {
    return {
      locations: [
        {
          title: 'Home',
          href: resolveHref(params.type)!,
        },
      ],
      message: 'This document is used to render the front page',
    } satisfies DocumentLocationsState
  }

  if (params.type === 'location') {
    const doc$ = context.documentStore.listenQuery(
      `*[_id==$id || references($id)]{_type,slug,title,cuisines[]->{_type,slug,title}}`,
      params,
      { perspective: 'previewDrafts' },
    ) as Observable<
      | {
          _type: string
          slug: { current: string }
          title: string | null
          cuisines: {
            _type: string
            slug: { current: string }
            title: string | null
          }[]
        }[]
      | null
    >
    return doc$.pipe(
      map((docs) => {
        return {
          locations: docs
            ?.map((doc) => {
              const href = resolveHref(doc._type, doc?.slug?.current)

              const locations = [
                {
                  title: doc?.title || 'Untitled',
                  href: href!,
                },
              ]

              doc?.cuisines?.map((cuisine) => {
                const cuisineHref = resolveHref(
                  'locationCuisine',
                  doc?.slug?.current,
                  [cuisine?.slug?.current],
                )
                if (cuisineHref) {
                  locations.push({
                    title: cuisine?.title || 'Untitled',
                    href: cuisineHref,
                  })
                }
              })

              return locations as DocumentLocation[]
            })
            .flat()
            .filter((doc) => doc?.href !== undefined),
        } satisfies DocumentLocationsState
      }),
    )
  }

  if (params.type === 'cuisine') {
    const doc$ = context.documentStore.listenQuery(
      `*[_id==$id || references($id)]{
        _type,
        slug,
        title,
        (_type == "location") => {
          cuisines[]->{
            _type,
            slug,
            title
          }
        }
      }`,
      params,
      { perspective: 'previewDrafts' },
    ) as Observable<
      | {
          _type: string
          slug: { current: string }
          title: string | null
          cuisines?: {
            _type: string
            slug: { current: string }
            title: string | null
          }[]
        }[]
      | null
    >
    return doc$.pipe(
      map((docs) => {
        switch (params.type) {
          case 'cuisine':
            return {
              locations: docs
                ?.map((doc) => {
                  const href = resolveHref(doc._type, doc?.slug?.current)

                  if (doc._type === 'location') {
                    const locations = [
                      {
                        title: doc?.title || 'Untitled',
                        href: href!,
                      },
                    ]

                    doc?.cuisines?.map((cuisine) => {
                      const cuisineHref = resolveHref(
                        'locationCuisine',
                        doc?.slug?.current,
                        [cuisine?.slug?.current],
                      )
                      if (cuisineHref) {
                        locations.push({
                          title: cuisine?.title || 'Untitled',
                          href: cuisineHref,
                        })
                      }
                    })

                    return locations as DocumentLocation[]
                  }

                  return {
                    title: doc?.title || 'Untitled',
                    href: href!,
                  }
                })
                .flat()
                .filter((doc) => doc.href !== undefined),
            } satisfies DocumentLocationsState
          default:
            return {
              message: 'Unable to map document type to locations',
              tone: 'critical',
            } satisfies DocumentLocationsState
        }
      }),
    )
  }

  if (params.type === 'locationCuisine') {
    const doc$ = context.documentStore.listenQuery(
      `*[_id==$id]{
        _type,
        location->{
          _type,
          title,
          slug,
        },
        cuisine->{
          _type,
          title,
          slug,
        }
      }`,
      params,
      { perspective: 'previewDrafts' },
    ) as Observable<
      | {
          _type: string
          location?: {
            slug: { current: string }
            title: string | null
          }
          cuisine?: {
            slug: { current: string }
            title: string | null
          }
        }[]
      | null
    >
    return doc$.pipe(
      map((docs) => {
        return {
          locations: docs
            ?.map((doc) => {
              if (doc?.location && doc?.cuisine) {
                const href = resolveHref(
                  'locationCuisine',
                  doc?.location?.slug?.current,
                  [doc?.cuisine?.slug?.current],
                )

                return {
                  title: `${doc?.location?.title} x ${doc?.cuisine?.title}`,
                  href: href!,
                }
              }

              return {}
            })
            .filter(
              (doc) => !doc || doc?.href !== undefined,
            ) as DocumentLocation[],
        } satisfies DocumentLocationsState
      }),
    )
  }

  if (params.type === 'page') {
    const doc$ = context.documentStore.listenQuery(
      `*[_id==$id || references($id)]{_type,slug,title}`,
      params,
      { perspective: 'previewDrafts' },
    ) as Observable<
      | {
          _type: string
          slug: { current: string }
          title: string | null
        }[]
      | null
    >
    return doc$.pipe(
      map((docs) => {
        switch (params.type) {
          case 'page':
            return {
              locations: docs
                ?.map((doc) => {
                  const href = resolveHref(doc._type, doc?.slug?.current)
                  return {
                    title: doc?.title || 'Untitled',
                    href: href!,
                  }
                })
                .filter((doc) => doc.href !== undefined),
            } satisfies DocumentLocationsState
          default:
            return {
              message: 'Unable to map document type to locations',
              tone: 'critical',
            } satisfies DocumentLocationsState
        }
      }),
    )
  }

  return null
}
