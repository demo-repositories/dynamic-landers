import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import Link from 'next/link'

import { CuisineListItem } from '@/components/pages/home/CuisineListItem'
import { CustomPortableText } from '@/components/shared/CustomPortableText'
import { Header } from '@/components/shared/Header'
import ImageBox from '@/components/shared/ImageBox'
import { filterObjectKeys, placeholderReplace } from '@/sanity/lib/utils'
import { resolveHref } from '@/sanity/lib/utils'
import type { LocationCuisinePayload } from '@/types'

export interface LocationPageProps {
  data: LocationCuisinePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function LocationCuisinePage({
  data,
  encodeDataAttribute,
}: LocationPageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { location, cuisine, h1 } = data ?? {}

  const placeholderData = location
    ? {
        ...filterObjectKeys(location, [
          'title',
          'joined',
          'cuisineCount',
          'population',
          'partners',
          'reviews',
          'reviewAverage',
        ]),
        cuisine: cuisine?.title,
        location: location?.title,
      }
    : {}

  return (
    <div>
      <div className="mb-20 space-y-6">
        {/* Header */}
        <Header title={placeholderReplace(h1, placeholderData)} />

        {/* Body */}
        {location?.overview && (
          <div className="prose">
            <CustomPortableText
              paragraphClasses="font-serif max-w-3xl text-gray-600 text-xl"
              value={location.overview}
              placeholderData={placeholderData}
              encodeDataAttribute={encodeDataAttribute}
            />
          </div>
        )}

        {/* Cuisine */}
        <div className="grid grid-cols-2 gap-6">
          {/* Image  */}
          {cuisine?.coverImage && (
            <ImageBox
              data-sanity={encodeDataAttribute?.('coverImage')}
              image={cuisine?.coverImage}
              // @TODO add alt field in schema
              alt=""
              width={600}
              height={600}
              classesWrapper="relative aspect-[1/1] rounded-md border"
            />
          )}

          {/* Description */}
          {cuisine?.description && (
            <div className="prose">
              <CustomPortableText
                paragraphClasses="font-serif max-w-3xl text-xl text-gray-600"
                value={cuisine.description}
              />
            </div>
          )}
        </div>

        {/* Other Cuisines */}
        {location?.cuisines && location.cuisines.length > 0 && (
          <div className="mx-auto max-w-[100rem]">
            <div className="grid grid-cols-3 gap-4">
              {location.cuisines.map((cuisine, key) => {
                const href = resolveHref('locationCuisine', location.slug, [
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

export default LocationCuisinePage
