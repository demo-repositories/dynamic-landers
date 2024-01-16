import { PortableText, PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { vercelStegaCleanAll } from '@sanity/client/stega'
import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import { Image } from 'sanity'

import ImageBox from '@/components/shared/ImageBox'
import { TimelineSection } from '@/components/shared/TimelineSection'

export function CustomPortableText({
  paragraphClasses,
  value,
  placeholderData,
  encodeDataAttribute,
}: {
  paragraphClasses?: string
  value: PortableTextBlock[]
  placeholderData?: any
  encodeDataAttribute?: EncodeDataAttributeCallback
}) {
  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => {
        return <p className={paragraphClasses}>{children}</p>
      },
    },
    marks: {
      link: ({ children, value }) => {
        return (
          <a
            className="underline transition hover:opacity-50"
            href={value?.href}
            rel="noreferrer noopener"
          >
            {children}
          </a>
        )
      },
    },
    types: {
      image: ({
        value,
      }: {
        value: Image & { alt?: string; caption?: string }
      }) => {
        return (
          <div className="my-6 space-y-2">
            <ImageBox
              image={value}
              alt={value.alt}
              classesWrapper="relative aspect-[16/9]"
            />
            {value?.caption && (
              <div className="font-sans text-sm text-gray-600">
                {value.caption}
              </div>
            )}
          </div>
        )
      },
      timeline: ({ value }) => {
        const { items } = value || {}
        return <TimelineSection timelines={items} />
      },
      placeholder: ({ value }) => {
        const { field } = value
        if (!field) return ''

        const cleanField = vercelStegaCleanAll(field)

        return (
          <>
            {cleanField == 'joined'
              ? new Date(placeholderData?.[cleanField]).toLocaleDateString(
                  'en-gb',
                  {
                    year: 'numeric',
                    month: 'short',
                  },
                )
              : `${placeholderData?.[cleanField]}`}
          </>
        )
      },
    },
  }

  return <PortableText components={components} value={value} />
}
