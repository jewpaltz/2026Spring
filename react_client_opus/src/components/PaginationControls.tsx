import { useMemo } from 'react'

type PaginationControlsProps = {
  currentPage?: number
  totalPages: number
  pageSize?: number
  onPageChange?: (page: number) => void
  onPageSizeChange?: (size: number) => void
}

export default function PaginationControls({
  currentPage = 1,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PaginationControlsProps) {
  const current = currentPage ?? 1

  function goTo(page: number) {
    if (page < 1 || page > totalPages) return
    onPageChange?.(page)
  }

  // Build the list of page entries: numbers or 'ellipsis'
  const pages = useMemo(() => {
    const total = totalPages
    const result: (number | 'ellipsis')[] = []

    if (total <= 7) {
      for (let i = 1; i <= total; i++) result.push(i)
      return result
    }

    result.push(1)
    if (current > 3) result.push('ellipsis')
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
      result.push(i)
    }
    if (current < total - 2) result.push('ellipsis')
    result.push(total)

    return result
  }, [totalPages, current])

  return (
    <nav className="pagination is-centered" role="navigation" aria-label="pagination">
      <a
        href="#"
        className={`pagination-previous ${current === 1 ? 'is-disabled' : ''}`}
        onClick={(e) => { e.preventDefault(); goTo(current - 1) }}
      >
        Previous
      </a>
      <a
        href="#"
        className={`pagination-next ${current === totalPages ? 'is-disabled' : ''}`}
        onClick={(e) => { e.preventDefault(); goTo(current + 1) }}
      >
        Next page
      </a>
      <ul className="pagination-list">
        {pages.map((page, i) =>
          page === 'ellipsis' ? (
            <li key={`ellipsis-${i}`}>
              <span className="pagination-ellipsis">&hellip;</span>
            </li>
          ) : (
            <li key={page}>
              <a
                href="#"
                className={`pagination-link ${page === current ? 'is-current' : ''}`}
                aria-label={`Goto page ${page}`}
                aria-current={page === current ? 'page' : undefined}
                onClick={(e) => { e.preventDefault(); goTo(page) }}
              >
                {page}
              </a>
            </li>
          ),
        )}
      </ul>
      {pageSize && (
        <div className="select" style={{ order: 2 }}>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
            <option value={50}>50 per page</option>
          </select>
        </div>
      )}
    </nav>
  )
}
