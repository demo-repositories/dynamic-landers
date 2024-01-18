import { UtensilsCrossed } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'locationCuisine',
  title: 'Location x Cuisine',
  type: 'document',
  icon: UtensilsCrossed,
  fields: [
    defineField({
      name: 'location',
      title: 'Location',
      type: 'reference',
      to: [{ type: 'location' }],
    }),
    defineField({
      name: 'cuisine',
      title: 'Cuisine',
      type: 'reference',
      to: [{ type: 'cuisine' }],
    }),
    defineField({
      name: 'title',
      title: 'H1 title',
      type: 'string',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      location: 'location.title',
      cuisine: 'cuisine.title',
    },
    prepare({ location, cuisine }: { location: string; cuisine: string }) {
      return {
        title: `${location || '...'} x ${cuisine || '...'}`,
      }
    },
  },
})
