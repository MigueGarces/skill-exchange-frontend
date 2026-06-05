export default function Pagination({ count, page, pageSize, onPageChange }) {
  const totalPages = Math.ceil(count / pageSize)
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-between mt-6 text-sm">
      <span className="text-muted-foreground">
        {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, count)} de {count}
      </span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="px-2 py-1 disabled:opacity-40 hover:bg-muted"
        >‹</button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`px-3 py-1 rounded border ${
              p === page ? "bg-blue-600 text-white border-blue-600" : "hover:bg-muted"
            }`}>
            {p}
          </button>
        ))}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="px-2 py-1 rounded border disabled:opacity-40 hover:bg-muted"
        >›</button>
      </div>
    </div>
  )
}