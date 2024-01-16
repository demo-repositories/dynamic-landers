import { BlockContentIcon } from '@sanity/icons'
import { defineArrayMember, defineField } from 'sanity'

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
      styles: [],
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
                list: [
                  'title',
                  'joined',
                  'cuisineCount',
                  'population',
                  'partners',
                  'reviews',
                  'reviewAverage',
                ],
              },
            }),
          ],
          type: 'object',
        }),
      ],
    }),
  ],
  validation: (rule) => rule.max(155).required(),
})
