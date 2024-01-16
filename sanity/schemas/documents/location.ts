import { BlockContentIcon } from '@sanity/icons'
import { MapPinned } from 'lucide-react'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'location',
  title: 'Locations',
  type: 'document',
  icon: MapPinned,
  groups: [
    {
      title: 'General',
      name: 'general',
      default: true,
    },
    {
      title: 'Details',
      name: 'details',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the name of the location.',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
      group: ['general'],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
      group: ['general'],
    }),
    defineField({
      name: 'overview',
      description: 'Used to override the default location subheader.',
      title: 'Overview',
      type: 'portableTextLocation',
      validation: (rule) => rule.max(155),
      group: ['general'],
    }),
    defineField({
      name: 'population',
      title: 'Population',
      type: 'number',
      group: ['details'],
    }),
    defineField({
      name: 'joined',
      title: 'Joined Date',
      description: 'The date the first partner in the location joined.',
      type: 'date',
      options: {
        dateFormat: 'DD/MM/YYYY',
      },
      group: ['details'],
    }),
    defineField({
      name: 'partners',
      title: 'Number of Partners',
      type: 'number',
      group: ['details'],
    }),
    defineField({
      name: 'cuisines',
      title: 'Cuisines',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'cuisine' }],
        }),
      ],
      group: ['details'],
    }),
    defineField({
      name: 'reviews',
      title: 'Reviews',
      type: 'number',
      group: ['details'],
    }),
    defineField({
      name: 'reviewAverage',
      title: 'Review Average',
      type: 'number',
      group: ['details'],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: ['general'],
    }),
  ],
})
