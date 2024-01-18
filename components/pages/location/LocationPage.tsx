import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import Link from 'next/link'

import { CuisineListItem } from '@/components/pages/home/CuisineListItem'
import { CustomPortableText } from '@/components/shared/CustomPortableText'
import { Header } from '@/components/shared/Header'
import { filterObjectKeys, placeholderReplace } from '@/sanity/lib/utils'
import { resolveHref } from '@/sanity/lib/utils'
import type { LocationPayload } from '@/types'

export interface LocationPageProps {
  data: LocationPayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function LocationPage({ data, encodeDataAttribute }: LocationPageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { h1 = '', overview, cuisines = [], slug } = data ?? {}

  const placeholderData = data
    ? filterObjectKeys(data, [
        'title',
        'joined',
        'cuisineCount',
        'population',
        'partners',
        'reviews',
        'reviewAverage',
      ])
    : {}

  return (
    <div>
      <div className="mb-20 space-y-6">
        {/* Header */}
        <Header title={placeholderReplace(h1, data)} />

        {/* Body */}
        {overview && (
          <div className="prose">
            <CustomPortableText
              paragraphClasses="font-serif max-w-3xl text-gray-600 text-xl"
              value={overview}
              placeholderData={placeholderData}
              encodeDataAttribute={encodeDataAttribute}
            />
          </div>
        )}

        {cuisines && cuisines.length > 0 && (
          <div className="mx-auto max-w-[100rem]">
            <div className="grid grid-cols-3 gap-4">
              {cuisines.map((cuisine, key) => {
                const href = resolveHref('locationCuisine', slug, [
                  cuisine.slug,
                ])
                if (!href) {
                  return null
                }
                return (
                  <Link
                    key={key}
                    href={href}
                    data-sanity={encodeDataAttribute?.([
                      'showcaseCuisines',
                      key,
                      'slug',
                    ])}
                  >
                    <CuisineListItem cuisine={cuisine} />
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
      <div className="absolute left-0 w-screen border-t" />
    </div>
  )
}

export default LocationPage
