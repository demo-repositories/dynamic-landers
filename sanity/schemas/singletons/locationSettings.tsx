import { CogIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'locationSettings',
  title: 'Location Settings',
  type: 'document',
  icon: CogIcon,
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
      name: 'overview',
      description: 'Used to set the default location subheader.',
      title: 'Overview',
      type: 'portableTextLocation',
      validation: (rule) => rule.required().max(155),
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
        title: 'Location - Global Settings',
      }
    },
  },
})
