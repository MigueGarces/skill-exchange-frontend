"use client"

import { useEffect, useState } from "react"
import { getUsers } from "@/lib/api"
import Pagination from "@/components/ui/Pagination"

export default function UsersPage() {
  const [users,   setUsers]   = useState([])
  const [count,   setCount]   = useState(0)
  const [page,    setPage]    = useState(1)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    setLoading(true)
    getUsers({ page })
      .then((data) => {
        setUsers(data.results ?? data)
        setCount(data.count ?? 0)
      })
      .catch(() => setError("No se pudieron cargar los usuarios."))
      .finally(() => setLoading(false))
  }, [page])

  return (
    <main className="flex-1 p-6 space-y-6">
      <h2 className="font-semibold">Usuarios</h2>

      {loading && <p className="text-sm text-muted-foreground">Cargando usuarios...</p>}
      {error   && <p className="text-sm text-destructive">{error}</p>}

      {!loading && !error && (
        <div className="border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="text-left px-4 py-3">Usuario</th>
                <th className="text-left px-4 py-3">Email</th>
                <th className="text-left px-4 py-3">Fecha de Ingreso</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const initials = [user.first_name?.[0], user.last_name?.[0]]
                  .filter(Boolean).join("").toUpperCase() || "?"
                return (
                  <tr key={user.id} className="border-t">
                    <td className="px-4 py-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-semibold">
                        {initials}
                      </div>
                      {user.first_name} {user.last_name}
                    </td>
                    <td className="px-4 text-muted-foreground">{user.email}</td>
                    <td className="px-4 text-muted-foreground">
                      {user.date_joined
                        ? new Date(user.date_joined).toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" })
                        : "—"}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
      <Pagination count={count} page={page} pageSize={10} onPageChange={setPage} />
    </main>
  )
}