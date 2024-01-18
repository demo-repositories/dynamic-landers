/**
 * This config is used to set up Sanity Studio that's mounted on the `app/studio/[[...index]]/Studio.tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import { media } from 'sanity-plugin-media'

import Icon from '@/components/global/Logo/Icon'
import { apiVersion, dataset, projectId, studioUrl } from '@/sanity/lib/api'
import { locate } from '@/sanity/plugins/locate'
import { singletonPlugin } from '@/sanity/plugins/settings'
import cuisine from '@/sanity/schemas/documents/cuisine'
import location from '@/sanity/schemas/documents/location'
import locationCuisine from '@/sanity/schemas/documents/locationCuisine'
import page from '@/sanity/schemas/documents/page'
import redirect from '@/sanity/schemas/documents/redirect'
import portableText from '@/sanity/schemas/objects/portableText'
import portableTextLocation from '@/sanity/schemas/objects/portableTextLocation'
import seo from '@/sanity/schemas/objects/seo'
import home from '@/sanity/schemas/singletons/home'
import locationCuisineSettings from '@/sanity/schemas/singletons/locationCuisineSettings'
import locationSettings from '@/sanity/schemas/singletons/locationSettings'
import settings from '@/sanity/schemas/singletons/settings'
import { structure } from '@/sanity/structure/structure'

const title =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE ||
  'Next.js Personal Website with Sanity.io'

export default defineConfig({
  basePath: studioUrl,
  projectId: projectId || '',
  dataset: dataset || '',
  title,
  schema: {
    // If you want more content types, you can add them to this array
    types: [
      // Singletons
      home,
      settings,
      locationSettings,
      locationCuisineSettings,
      // Documents
      page,
      cuisine,
      location,
      locationCuisine,
      redirect,
      // Objects
      seo,
      portableText,
      portableTextLocation,
    ],
  },
  plugins: [
    structureTool({
      structure,
    }),
    presentationTool({
      locate,
      previewUrl: {
        draftMode: {
          enable: '/api/draft',
        },
      },
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin([home.name, settings.name]),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    // media plugin
    media(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  icon: Icon,
})
