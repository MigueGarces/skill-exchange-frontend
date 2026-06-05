"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Code2, Palette, MessageSquare, Users, Briefcase, Sprout, MoreHorizontal, Search } from "lucide-react"
import { getSkills } from "@/lib/api"
import Pagination from "@/components/ui/Pagination"

const CATEGORIES = [
  { id: "technical",            label: "Technical",            Icon: Code2          },
  { id: "creative",             label: "Creative",             Icon: Palette        },
  { id: "communication",        label: "Communication",        Icon: MessageSquare  },
  { id: "leadership",           label: "Leadership",           Icon: Users          },
  { id: "business",             label: "Business",             Icon: Briefcase      },
  { id: "personal_development", label: "Personal development", Icon: Sprout         },
  { id: "other",                label: "Other",                Icon: MoreHorizontal },
]

const LEVEL_COLORS = {
  beginner:     "text-green-600 border-green-400",
  intermediate: "text-blue-600 border-blue-400",
  advanced:     "text-orange-500 border-orange-400",
  expert:       "text-purple-600 border-purple-400",
}

export default function SkillsPage() {
  const router = useRouter()

  const [skills,         setSkills]         = useState([])
  const [count,          setCount]          = useState(0)
  const [loading,        setLoading]        = useState(true)
  const [error,          setError]          = useState(null)
  const [activeCategory, setActiveCategory] = useState("")
  const [searchText,     setSearchText]     = useState("")
  const [ordering,       setOrdering]       = useState("name")
  const [page,           setPage]           = useState(1)

  useEffect(() => {
    setLoading(true)
    setError(null)
    getSkills({ category: activeCategory, search: searchText, ordering, page })
      .then((data) => {
        setSkills(data.results ?? data)
        setCount(data.count ?? 0)
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          localStorage.removeItem("access_token")
          router.replace("/login")
        } else {
          setError("No se pudieron cargar los skills.")
        }
      })
      .finally(() => setLoading(false))
  }, [activeCategory, searchText, ordering, page, router])

  return (
    <main className="flex-1 space-y-6">
      <h2 className="text-xl font-semibold">Skills</h2>

      <div className="flex flex-wrap border overflow-hidden">
        {CATEGORIES.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => { setActiveCategory(activeCategory === id ? "" : id); setPage(1) }}
            className={[
              "flex flex-col items-center px-5 py-3",
              activeCategory === id
                ? "bg-blue-600 text-white"
                : "bg-background hover:bg-muted",
            ].join(" ")}
          >
            <Icon size={18} strokeWidth={1.5} />
            <span>{label}</span>
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <div className="flex flex-1 items-center gap-2 focus-within:ring-2">
          <Search size={15} className="text-muted-foreground shrink-0" />
          <input
            type="text"
            placeholder="Buscar skills..."
            value={searchText}
            onChange={(e) => { setSearchText(e.target.value); setPage(1) }}
            className="flex-1 py-2 text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <select
          value={ordering}
          onChange={(e) => { setOrdering(e.target.value); setPage(1) }}
          className="border border-input px-3 text-sm cursor-pointer"
        >
          <option value="name">Nombre A→Z</option>
          <option value="-name">Nombre Z→A</option>
          <option value="created_at">Más antiguos</option>
          <option value="-created_at">Más recientes</option>
        </select>
      </div>

      {loading && <p className="text-sm text-muted-foreground">Cargando skills...</p>}
      {error   && <p className="text-sm text-destructive">{error}</p>}
      {!loading && !error && skills.length === 0 && (
        <p className="text-sm text-muted-foreground">No hay skills para mostrar.</p>
      )}

      {!loading && !error && skills.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skills.map((skill) => (
            <div
              key={skill.id}
              onClick={() => router.push(`/dashboard/skills/${skill.id}`)}
              className="border rounded-md p-4 bg-card"
            >
              <div className="flex justify-between items-start">
                <p className="text-sm text-foreground">{skill.name}</p>
                {skill.level && (
                  <span className={`text-xs px-2 rounded-full border ${LEVEL_COLORS[skill.level] || "text-muted-foreground border-muted"}`}>
                    {skill.level.charAt(0).toUpperCase() + skill.level.slice(1)}
                  </span>
                )}
              </div>
              {skill.category && (
                <p className="text-xs text-muted-foreground">{skill.category}</p>
              )}
            </div>
          ))}
        </div>
      )}

      <Pagination count={count} page={page} pageSize={10} onPageChange={setPage} />
    </main>
  )
}