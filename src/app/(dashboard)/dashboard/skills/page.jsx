"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {Code2, Palette, MessageSquare, Users, Briefcase, Sprout, MoreHorizontal, Search,} from "lucide-react"
import { getSkills } from "@/lib/api"

const CATEGORIES = [
  { id: "technical",            label: "Technical",            Icon: Code2         },
  { id: "creative",             label: "Creative",             Icon: Palette        },
  { id: "communication",        label: "Communication",        Icon: MessageSquare  },
  { id: "leadership",           label: "Leadership",           Icon: Users          },
  { id: "business",             label: "Business",             Icon: Briefcase      },
  { id: "personal_development", label: "Personal development", Icon: Sprout         },
  { id: "other",                label: "Other",                Icon: MoreHorizontal },
]

export default function SkillsPage() {
  const router = useRouter()

  const [skills,           setSkills]           = useState([])
  const [loading,          setLoading]          = useState(true)
  const [error,            setError]            = useState(null)
  const [activeCategory,   setActiveCategory]   = useState("technical")
  const [searchText,       setSearchText]       = useState("")
  const [sortOrder,        setSortOrder]        = useState("asc") 

  useEffect(() => {
    getSkills()
      .then(setSkills)
      .catch((err) => {
        if (err.response?.status === 401) {
          localStorage.removeItem("access_token")
          localStorage.removeItem("refresh_token")
          router.replace("/login")
        } else {
          setError("No se pudieron cargar los skills. Intenta de nuevo.")
        }
      })
      .finally(() => setLoading(false))
  }, [router])

  const visibleSkills = skills
    .filter((s) => s.category === activeCategory)
    .filter((s) => s.name.toLowerCase().includes(searchText.toLowerCase()))
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    )

  return (
    <main className="flex-1 p-6 space-y-6">

      <h2 className="text-xl font-semibold">Skills</h2>

      <div className="flex flex-wrap border overflow-hidden">
        {CATEGORIES.map(({ id, label, Icon }) => {
          const isActive = activeCategory === id
          return (
            <button
              key={id}
              onClick={() => setActiveCategory(id)}
              className={[
                "flex flex-col items-center px-5 py-3 text-xs",
                "last:border-r-0",
                "focus-visible:outline-none",
                isActive
                  ? "bg-[#84cc16] text-white"                         
                  : "bg-background",
              ].join(" ")}>
              <Icon size={18} strokeWidth={1.5} />
              <span>{label}</span>
            </button>
          )
        })}
      </div>

      <div className="flex gap-3">
        <div className="flex flex-1 items-center gap-2 border border-input  bg-background focus-within:ring-2">
          <Search size={15} className="text-muted-foreground shrink-0" />
          <input
            type="text"
            placeholder="Buscar skill..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="flex-1 text-sm placeholder:text-muted-foreground"
          />
        </div>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-input rounded-md px-3 py-2 text-sm cursor-pointer focus:ring-2">
          <option value="asc">Nombre A-Z</option>
          <option value="desc">Nombre Z-A</option>
        </select>
      </div>

      {loading && (
        <p className="text-sm text-muted-foreground">Cargando skills...</p>
      )}

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      {!loading && !error && (
        visibleSkills.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No hay skills en esta categoría{searchText ? " con ese nombre" : ""}.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleSkills.map((skill) => (
              <div
                key={skill.id}
                className="border border-border rounded-md p-4 bg-card space-y-1">
                <p className="text-sm font-semibold text-foreground">{skill.name}</p>
                {skill.level && (
                  <p className="text-xs text-muted-foreground">{skill.level}</p>
                )}
              </div>
            ))}
          </div>
        )
      )}
    </main>
  )
}