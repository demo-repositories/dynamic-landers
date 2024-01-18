import { HomeIcon } from '@sanity/icons'
import { Cog, MapPinned, UtensilsCrossed } from 'lucide-react'
import type { ListItemBuilder, StructureResolver } from 'sanity/structure'

// If you add document types to desk structure manually, you can add them to this array to prevent duplicates in the root pane
const DOCUMENT_TYPES_IN_STRUCTURE = [
  'home',
  'media.tag',
  'settings',
  'cuisine',
  'location',
  'locationSettings',
  'locationCuisine',
  'locationCuisineSettings',
  'page',
  'redirect',
]

// The StructureResolver is how we're changing the DeskTool structure to linking to document (named Singleton)
// like how "Home" is handled.
export const structure: StructureResolver = (S, context) => {
  return S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home')
        .icon(HomeIcon)
        .child(S.editor().id('home').schemaType('home').documentId('home')),
      S.divider(),
      S.listItem()
        .title('Cuisines')
        .schemaType('cuisine')
        .child(S.documentTypeList('cuisine')),
      S.listItem()
        .title('Locations')
        .schemaType('location')
        .child(
          S.list()
            .title('Locations')
            .items([
              S.listItem()
                .title('Global Settings')
                .icon(Cog)
                .child(
                  S.editor()
                    .id('locationSettings')
                    .schemaType('locationSettings')
                    .documentId('locationSettings'),
                ),
              S.listItem()
                .title('All Locations')
                .id('location')
                .icon(MapPinned)
                .child(
                  S.documentTypeList('location').defaultOrdering([
                    { field: 'name', direction: 'asc' },
                  ]),
                ),
            ]),
        ),
      S.listItem()
        .title('Location x Cuisine Pages')
        .schemaType('locationCuisine')
        .child(
          S.list()
            .title('Location x Cuisine')
            .items([
              S.listItem()
                .title('Global Settings')
                .icon(Cog)
                .child(
                  S.editor()
                    .id('locationCuisineSettings')
                    .schemaType('locationCuisineSettings')
                    .documentId('locationCuisineSettings'),
                ),
              S.listItem()
                .title('Override Pages')
                .id('locationCuisine')
                .icon(UtensilsCrossed)
                .child(
                  S.documentTypeList('locationCuisine').defaultOrdering([
                    { field: 'name', direction: 'asc' },
                  ]),
                ),
            ]),
        ),
      ...S.documentTypeListItems().filter(
        (listItem: ListItemBuilder) =>
          // @ts-expect-error Object is possibly 'undefined'
          !DOCUMENT_TYPES_IN_STRUCTURE.includes(listItem?.getId().toString()),
      ),
      S.divider(),
      S.listItem()
        .title('Settings')
        .icon(Cog)
        .child(
          S.list()
            .title('Settings')
            .items([
              S.listItem()
                .title('Site Settings')
                .icon(Cog)
                .child(
                  S.editor()
                    .id('settings')
                    .schemaType('settings')
                    .documentId('settings'),
                ),
              S.listItem()
                .title('Redirects')
                .schemaType('redirect')
                .child(S.documentTypeList('redirect')),
            ]),
        ),
    ])
}
