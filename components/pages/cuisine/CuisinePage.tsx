import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import Link from 'next/link'

import { CustomPortableText } from '@/components/shared/CustomPortableText'
import { Header } from '@/components/shared/Header'
import ImageBox from '@/components/shared/ImageBox'
import { resolveHref } from '@/sanity/lib/utils'
import type { CuisinePayload } from '@/types'

export interface CuisinePageProps {
  data: CuisinePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function CuisinePage({ data, encodeDataAttribute }: CuisinePageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { coverImage, description, title, locations = [] } = data ?? {}

  return (
    <div>
      <div className="mb-20 space-y-6">
        {/* Header */}
        <Header title={title} />

        <div className="grid grid-cols-2 gap-6">
          {/* Image  */}
          <ImageBox
            data-sanity={encodeDataAttribute?.('coverImage')}
            image={coverImage}
            // @TODO add alt field in schema
            alt=""
            width={600}
            height={600}
            classesWrapper="relative aspect-[1/1] rounded-md border"
          />

          {/* Description */}
          {description && (
            <CustomPortableText
              paragraphClasses="font-serif max-w-3xl text-xl text-gray-600"
              value={description}
            />
          )}
        </div>

        {locations && locations.length > 0 && (
          <div className="mx-auto max-w-[100rem] prose">
            <h2>Locations:</h2>
            <ul>
              {locations.map((location, key) => {
                const href = resolveHref(location._type, location.slug)
                if (!href) {
                  return null
                }
                return (
                  <li key={key}>
                    <Link
                      href={href}
                      data-sanity={encodeDataAttribute?.([
                        'location',
                        key,
                        'title',
                      ])}
                    >
                      {location.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
      <div className="absolute left-0 w-screen border-t" />
    </div>
  )
}

export default CuisinePage
