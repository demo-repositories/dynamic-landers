import { toPlainText } from '@portabletext/react'
import { Metadata, ResolvingMetadata } from 'next'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { LocationPage } from '@/components/pages/location/LocationPage'
import { placeholderReplace } from '@/sanity/lib/utils'
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'
import { loadLocation } from '@/sanity/loader/loadQuery'
const LocationPagePreview = dynamic(
  () => import('@/components/pages/location/LocationPagePreview'),
)

type Props = {
  params: { location: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { data: location } = await loadLocation(params.location)

  const metaData = {
    title: location?.seo?.title || location?.title,
    description: location?.seo?.description || (await parent).description,
  }

  return {
    title: placeholderReplace(metaData?.title, location),
    description: placeholderReplace(metaData?.description, location),
  }
}

export function generateStaticParams() {
  return generateStaticSlugs('location')
}

export default async function PageSlugRoute({ params }: Props) {
  const initial = await loadLocation(params.location)

  if (draftMode().isEnabled) {
    return <LocationPagePreview params={params} initial={initial} />
  }

  if (!initial.data) {
    notFound()
  }

  return <LocationPage data={initial.data} />
}
