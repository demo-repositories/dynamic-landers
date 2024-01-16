import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import Link from 'next/link'

import { ProjectListItem } from '@/components/pages/home/ProjectListItem'
import { Header } from '@/components/shared/Header'
import { resolveHref } from '@/sanity/lib/utils'
import type { HomePagePayload } from '@/types'

export interface HomePageProps {
  data: HomePagePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function HomePage({ data, encodeDataAttribute }: HomePageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const {
    overview = [],
    showcaseCuisines = [],
    locations = [],
    title = '',
  } = data ?? {}

  return (
    <div className="space-y-20">
      {/* Header */}
      {title && <Header centered title={title} description={overview} />}
      {/* Showcase projects */}
      {showcaseCuisines && showcaseCuisines.length > 0 && (
        <div className="mx-auto max-w-[100rem]">
          <div className="grid grid-cols-3 gap-4">
            {showcaseCuisines.map((project, key) => {
              const href = resolveHref(project._type, project.slug)
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
                  <ProjectListItem project={project} odd={key % 2} />
                </Link>
              )
            })}
          </div>
        </div>
      )}
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
                      'locations',
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
  )
}

export default HomePage
