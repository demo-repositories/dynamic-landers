'use client'

import { type QueryResponseInitial } from '@sanity/react-loader'

import { locationCuisineBySlugQuery } from '@/sanity/lib/queries'
import { useQuery } from '@/sanity/loader/useQuery'
import { LocationCuisinePayload } from '@/types'

import LocationCuisinePage from './LocationCuisinePage'

type Props = {
  params: { location: string }
  initial: QueryResponseInitial<LocationCuisinePayload | null>
}

export default function LocationPagePreview(props: Props) {
  const { params, initial } = props
  const { data, encodeDataAttribute } = useQuery<LocationCuisinePayload | null>(
    locationCuisineBySlugQuery,
    params,
    {
      initial,
    },
  )

  return (
    <LocationCuisinePage
      data={data!}
      encodeDataAttribute={encodeDataAttribute}
    />
  )
}
