import { Cog } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'locationCuisineSettings',
  title: 'Location Cuisine Settings',
  type: 'document',
  icon: Cog,
  fields: [
    defineField({
      name: 'title',
      description: (
        <>
          Sets the default <code>h1</code> header
        </>
      ),
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      description: (
        <>
          Used to set the default SEO settings. Supports the following
          placeholders:{' '}
          <code>
            {'{'}cuisine{'}'}
          </code>
          ,{' '}
          <code>
            {'{'}location{'}'}
          </code>
          ,{' '}
          <code>
            {'{'}joined{'}'}
          </code>
          ,{' '}
          <code>
            {'{'}cuisineCount{'}'}
          </code>
          ,{' '}
          <code>
            {'{'}cuisineCount{'}'}
          </code>{' '}
          <code>
            {'{'}population{'}'}
          </code>{' '}
          <code>
            {'{'}partners{'}'}
          </code>{' '}
          <code>
            {'{'}reviews{'}'}
          </code>{' '}
          <code>
            {'{'}reviewAverage{'}'}
          </code>
        </>
      ),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Location x Cuisine - Global Settings',
      }
    },
  },
})
