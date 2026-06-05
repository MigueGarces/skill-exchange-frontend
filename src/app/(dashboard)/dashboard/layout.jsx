"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const NAV_LINKS = [
  { href: "/dashboard",        label: "Inicio"    },
  { href: "/dashboard/skills", label: "Skills"    },
  { href: "/dashboard/users",  label: "Usuarios"  },
  { href: "/dashboard/goals",  label: "Metas"     },
]

export default function DashboardLayout({ children }) {
  const router   = useRouter()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("access_token")
    if (!token) router.replace("/login")
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    router.replace("/login")
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b px-6 py-3 flex items-center justify-between relative">

        <div className="flex items-center gap-6">
          <span className="text-base font-semibold">Skill Exchange</span>
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm transition-colors",
                  pathname === link.href
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="hidden md:inline-flex"
        >
          Cerrar sesión
        </Button>

        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {menuOpen && (
        <div className="md:hidden border-b bg-background px-6 py-4 flex flex-col gap-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "text-sm px-3 py-2 rounded-md",
                pathname === link.href
                  ? "bg-muted font-medium"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="text-sm text-left px-3 py-2 text-destructive"
          >
            Cerrar sesión
          </button>
        </div>
      )}

      {children}
    </div>
  )
}