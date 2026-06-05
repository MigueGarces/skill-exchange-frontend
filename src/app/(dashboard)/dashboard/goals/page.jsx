"use client"

import { useEffect, useState } from "react"
import { getGoals, achieveGoal } from "@/lib/api"
import Pagination from "@/components/ui/Pagination"

export default function GoalsPage() {
  const [goals,   setGoals]   = useState([])
  const [count,   setCount]   = useState(0)
  const [page,    setPage]    = useState(1)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  const fetchGoals = () => {
    setLoading(true)
    getGoals({ page })
      .then((data) => {
        setGoals(data.results ?? data)
        setCount(data.count ?? 0)
      })
      .catch(() => setError("No se pudieron cargar las metas."))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchGoals() }, [page])

  const handleAchieve = async (goalId) => {
    try {
      await achieveGoal(goalId)
      fetchGoals()
    } catch {
      alert("No se pudo marcar la meta como alcanzada.")
    }
  }

  return (
    <main className="flex-1 p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Metas de Aprendizaje</h2>
        <p className="text-sm text-muted-foreground">
          Establece objetivos de estudio, mide tu progreso y alcanza tus metas.
        </p>
      </div>

      {loading && <p className="text-sm text-muted-foreground">Cargando metas...</p>}
      {error   && <p className="text-sm text-destructive">{error}</p>}

      {!loading && !error && goals.length === 0 && (
        <p className="text-sm text-muted-foreground">No tienes metas registradas.</p>
      )}

      {!loading && !error && goals.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {goals.map((goal) => {
            const current = Number(goal.current_value ?? 0)
            const target  = Number(goal.target_value  ?? 1)
            const percent = Math.min(Math.round((current / target) * 100), 100)

            return (
              <div key={goal.id} className="border p-4 space-y-3 bg-card">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-semibold">{goal.title}</p>
                  {goal.is_achieved && (
                    <span className="text-xs text-green-600 flex items-center gap-1">
                      Alcanzada
                    </span>
                  )}
                </div>

                {goal.skill_name && (
                  <p className="text-xs text-muted-foreground">
                    Skill vinculada: {goal.skill_name}
                  </p>
                )}

                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">
                    Progreso: {current} / {target} ({percent}%)
                  </p>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                {goal.deadline && (
                  <p className="text-xs text-muted-foreground">
                    📅 Límite: {new Date(goal.deadline).toLocaleDateString("es-CO", { day: "numeric", month: "short" })}
                  </p>
                )}

                {!goal.is_achieved && (
                  <button
                    onClick={() => handleAchieve(goal.id)}
                    className="w-full mt-1 py-1.5 text-xs rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                    Alcanzar meta
                  </button>
                )}
              </div>
            )
          })}
        </div>
      )}
      <Pagination count={count} page={page} pageSize={9} onPageChange={setPage} />
    </main>
  )
}