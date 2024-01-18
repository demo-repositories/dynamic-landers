import { Metadata, ResolvingMetadata } from 'next'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import Link from 'next/link'

import { HomePage } from '@/components/pages/home/HomePage'
import { studioUrl } from '@/sanity/lib/api'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import { loadHomePage } from '@/sanity/loader/loadQuery'
const HomePagePreview = dynamic(
  () => import('@/components/pages/home/HomePagePreview'),
)

export async function generateMetadata(
  params: {},
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { data: home } = await loadHomePage()
  const ogImage = urlForOpenGraphImage(home?.seo?.image)

  return {
    title: home?.seo?.title || home?.title,
    description: home?.seo?.description,
    openGraph: ogImage
      ? {
          images: [ogImage, ...((await parent).openGraph?.images || [])],
        }
      : {},
  }
}

export default async function IndexRoute() {
  const initial = await loadHomePage()

  if (draftMode().isEnabled) {
    return <HomePagePreview initial={initial} />
  }

  if (!initial.data) {
    return (
      <div className="text-center">
        You don&rsquo;t have a homepage yet,{' '}
        <Link href={`${studioUrl}/desk/home`} className="underline">
          create one now
        </Link>
        !
      </div>
    )
  }

  return <HomePage data={initial.data} />
}
