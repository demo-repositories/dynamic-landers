import { toPlainText } from '@portabletext/react'
import { Metadata, ResolvingMetadata } from 'next'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { LocationCuisinePage } from '@/components/pages/locationCuisine/LocationCuisinePage'
import { placeholderReplace } from '@/sanity/lib/utils'
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'
import { loadLocationCuisine } from '@/sanity/loader/loadQuery'
const LocationCuisinePagePreview = dynamic(
  () => import('@/components/pages/locationCuisine/LocationCuisinePagePreview'),
)

type Props = {
  params: { location: string; cuisine: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { data } = await loadLocationCuisine(params.location, params.cuisine)

  const metaData = {
    title: data?.seo?.title || data?.title,
    description: data?.seo?.description || (await parent).description,
  }

  const placeholderValues = {
    ...data?.location,
    ...data?.cuisine,
    location: data?.location?.title,
    cuisine: data?.cuisine?.title,
  }

  return {
    title: placeholderReplace(metaData?.title, placeholderValues),
    description: placeholderReplace(metaData?.description, placeholderValues),
  }
}

export function generateStaticParams() {
  return generateStaticSlugs('locationCuisine')
}

export default async function PageSlugRoute({ params }: Props) {
  const initial = await loadLocationCuisine(params.location, params.cuisine)

  if (draftMode().isEnabled) {
    return <LocationCuisinePagePreview params={params} initial={initial} />
  }

  if (!initial.data) {
    notFound()
  }

  return <LocationCuisinePage data={initial.data} />
}
