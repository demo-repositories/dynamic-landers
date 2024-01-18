import { BlockContentIcon } from '@sanity/icons'
import { defineArrayMember, defineField } from 'sanity'

const placeholderOptions = [
  { title: 'Location', value: 'title' },
  { title: 'Joined Date', value: 'joined' },
  { title: 'Cuisine Count', value: 'cuisineCount' },
  { title: 'Population', value: 'cuisinepopulationCount' },
  { title: 'Partners', value: 'partners' },
  { title: 'Review Count', value: 'reviews' },
  { title: 'Review Average', value: 'reviewAverage' },
]

export default defineField({
  name: 'portableTextLocation',
  title: 'Body',
  type: 'array',
  of: [
    // Paragraphs
    defineArrayMember({
      lists: [],
      marks: {
        annotations: [],
        decorators: [
          {
            title: 'Italic',
            value: 'em',
          },
          {
            title: 'Strong',
            value: 'strong',
          },
        ],
      },
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
      ],
      type: 'block',
      of: [
        defineArrayMember({
          title: 'Placeholder',
          name: 'placeholder',
          icon: BlockContentIcon,
          fields: [
            defineField({
              title: 'Field',
              name: 'field',
              type: 'string',
              options: {
                list: placeholderOptions,
              },
            }),
          ],
          type: 'object',
          preview: {
            select: {
              field: 'field',
            },
            prepare: ({ field }) => ({
              title: placeholderOptions.find((option) => option.value === field)
                ?.title,
            }),
          },
        }),
      ],
    }),
  ],
  validation: (rule) => rule.max(155).required(),
})
