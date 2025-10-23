import Link from "next/link"

interface BreadcrumbProps {
  items: Array<{
    label: string
    href: string
  }>
}

export function Breadcrumbs({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-2">
            {index > 0 && <span className="text-gray-400">/</span>}
            {index === items.length - 1 ? (
              <span className="text-gray-900 font-medium">{item.label}</span>
            ) : (
              <Link href={item.href} className="text-blue-600 hover:text-blue-700 hover:underline">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
