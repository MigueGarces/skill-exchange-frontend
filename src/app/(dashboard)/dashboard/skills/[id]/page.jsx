"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { getSkillById } from "@/lib/api"

const LEVEL_COLORS = {
  beginner:     "text-green-600 border-green-400",
  intermediate: "text-blue-600 border-blue-400",
  advanced:     "text-orange-500 border-orange-400",
  expert:       "text-purple-600 border-purple-400",
}

export default function SkillDetailPage() {
  const { id } = useParams()
  const router  = useRouter()
  const [skill,    setSkill]    = useState(null)
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)

  useEffect(() => {
    getSkillById(id)
      .then(setSkill)
      .catch(() => setError("No se pudo cargar el detalle de la skill."))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <main className="p-6"><p className="text-sm text-muted-foreground">Cargando...</p></main>
  if (error)   return <main className="p-6"><p className="text-sm text-destructive">{error}</p></main>

  return (
    <main className="p-6 space-y-4">
      <button
        onClick={() => router.back()}
        className="text-sm text-blue-600 hover:underline flex items-center gap-1"
      >
        ← Volver a Skills
      </button>

      <div className="border rounded-lg p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold">{skill.name}</h2>
            <p className="text-sm text-blue-600">{skill.category}</p>
          </div>
          {skill.level && (
            <span className={`text-xs px-3 py-1 rounded-full border ${LEVEL_COLORS[skill.level] || ""}`}>
              {skill.level.charAt(0).toUpperCase() + skill.level.slice(1)}
            </span>
          )}
        </div>

        {skill.description && (
          <p className="text-sm text-muted-foreground">{skill.description}</p>
        )}

        <div className="grid grid-cols-2 text-sm pt-2">
          <div>
            <p className="text-xs text-muted-foreground">ID</p>
            <p className="font-medium">#{skill.id}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Categoría</p>
            <p className="font-medium">{skill.category}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Nivel</p>
            <p className="font-medium">{skill.level}</p>
          </div>
          {skill.created_at && (
            <div>
              <p className="text-xs text-muted-foreground">Creada</p>
              <p className="font-medium">{new Date(skill.created_at).toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" })}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}