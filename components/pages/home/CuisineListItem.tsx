import ImageBox from '@/components/shared/ImageBox'
import type { ShowcaseCuisine } from '@/types'

interface ProjectProps {
  cuisine: ShowcaseCuisine
}

export function CuisineListItem(props: ProjectProps) {
  const { cuisine } = props

  return (
    <div
      className={`p-2 transition hover:bg-gray-50/50 xl:flex-row border rounded`}
    >
      <div className="w-full">
        <ImageBox
          image={cuisine.coverImage}
          alt={`Cover image from ${cuisine.title}`}
          classesWrapper="relative aspect-[16/9]"
        />
      </div>
      <div className="flex">
        <TextBox cuisine={cuisine} />
      </div>
    </div>
  )
}

function TextBox({ cuisine }: { cuisine: ShowcaseCuisine }) {
  return (
    <div className="relative mt-2 flex w-full flex-col justify-between p-3 xl:mt-0">
      <div>
        {/* Title */}
        <div className="mb-2 text-xl font-extrabold tracking-tight md:text-2xl">
          {cuisine.title}
        </div>
      </div>
    </div>
  )
}
