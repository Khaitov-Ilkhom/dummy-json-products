import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import { Link, useLocation } from "react-router-dom"

const Breadcrumbs = () => {
  const location = useLocation()
  const segments = location.pathname.split("/").filter(Boolean)

  const buildPath = (index: number) =>
      "/" + segments.slice(0, index + 1).join("/")

  const isDetailPage = segments.length >= 2

  return (
      <Breadcrumb className="w-full px-6">
        <BreadcrumbList>
          <BreadcrumbItem className="md:-mr-2 -mr-1">
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {segments.map((segment, index) => {
            // const isLast = index === segments.length - 1

            if (isDetailPage && index === segments.length - 2) {
              const combined = `${decodeURIComponent(segment)} - ${decodeURIComponent(segments[index + 1])}`
              const to = buildPath(index + 1)
              return (
                  <div key={index} className="flex items-center">
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link to={to} className="capitalize">
                          {combined}
                        </Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </div>
              )
            }

            if (isDetailPage && index === segments.length - 1) {
              return null
            }

            return (
                <div key={index} className="flex items-center">
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to={buildPath(index)} className="capitalize">
                        {decodeURIComponent(segment)}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </div>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
  )
}

export default Breadcrumbs
