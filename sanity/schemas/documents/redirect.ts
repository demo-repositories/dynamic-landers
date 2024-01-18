import { ArrowUpRightFromSquare } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'redirect',
  title: 'Redirects',
  type: 'document',
  icon: ArrowUpRightFromSquare,
  fields: [
    defineField({
      name: 'from',
      title: 'From',
      type: 'string',
      description: 'The path you want to redirect from',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'to',
      title: 'To',
      type: 'string',
      description: 'The path you want to redirect to',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'permanent',
      title: 'Is this a permanent (301) redirect?',
      description:
        'Turn this off to make this a temporary (302) redirect you intend on removing in the future.',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      from: 'from',
      to: 'to',
      permanent: 'permanent',
    },
    prepare({ from, to, permanent }) {
      return {
        title: from && to ? `${from} → ${to}` : 'Undefined Redirect',
        subtitle: permanent ? 'Permanent' : 'Temporary',
      }
    },
  },
})
