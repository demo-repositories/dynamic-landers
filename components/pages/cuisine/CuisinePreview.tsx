'use client'

import { type QueryResponseInitial } from '@sanity/react-loader'

import { cuisineBySlugQuery } from '@/sanity/lib/queries'
import { useQuery } from '@/sanity/loader/useQuery'
import { CuisinePayload } from '@/types'

import CuisinePage from './CuisinePage'

type Props = {
  params: { slug: string }
  initial: QueryResponseInitial<CuisinePayload | null>
}

export default function CuisinePreview(props: Props) {
  const { params, initial } = props
  const { data, encodeDataAttribute } = useQuery<CuisinePayload | null>(
    cuisineBySlugQuery,
    params,
    { initial },
  )

  return <CuisinePage data={data!} encodeDataAttribute={encodeDataAttribute} />
}
