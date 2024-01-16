import { toPlainText } from '@portabletext/react'
import { Metadata, ResolvingMetadata } from 'next'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { CuisinePage } from '@/components/pages/cuisine/CuisinePage'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'
import { loadCuisine } from '@/sanity/loader/loadQuery'
const CuisinePreview = dynamic(
  () => import('@/components/pages/cuisine/CuisinePreview'),
)

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { data: cuisine } = await loadCuisine(params.slug)
  const ogImage = urlForOpenGraphImage(
    cuisine?.seo?.image || cuisine?.coverImage,
  )

  return {
    title: cuisine?.seo?.title || cuisine?.title,
    description: cuisine?.seo?.description || (await parent).description,
    openGraph: ogImage
      ? {
          images: [ogImage, ...((await parent).openGraph?.images || [])],
        }
      : {},
  }
}

export function generateStaticParams() {
  return generateStaticSlugs('project')
}

export default async function ProjectSlugRoute({ params }: Props) {
  const initial = await loadCuisine(params.slug)

  if (draftMode().isEnabled) {
    return <CuisinePreview params={params} initial={initial} />
  }

  if (!initial.data) {
    notFound()
  }

  return <CuisinePage data={initial.data} />
}
