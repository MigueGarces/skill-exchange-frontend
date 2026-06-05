"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      router.replace("/dashboard")
    }
  }, [router])

  return (
    <div className="min-h-screen flex flex-col">

      <header className="flex items-center justify-between bg-white border-b">
        <span className="font-semibold text-sm">Skill Exchange</span>
        <button
          onClick={() => router.push("/login")}
          className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md transition-colors">
          Iniciar sesión
        </button>
      </header>

      <main className="flex flex-col items-center justify-center flex-1 text-center px-4 py-20 space-y-6">

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 max-w-xl leading-tight">
          Descubre y comparte habilidades
        </h1>

        <p className="max-w-md text-sm sm:text-base">
          Skills Exchange es la plataforma donde el conocimiento se convierte en conexión.
          Explora cientos de habilidades, filtra por categoría y encuentra lo que necesitas.
        </p>

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => router.push("/login")}
            className="px-5 py-2.5 text-sm">
            Empezar ahora →
          </button>
          <button
            onClick={() => router.push("/login")}
            className="px-5 py-2.5 text-sm">
            Ver skills
          </button>
        </div>

        <div className="pt-16 space-y-4 w-full max-w-2xl">
          <p className="text-sm font-medium">Todo lo que necesitas en un solo lugar</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">

            <div className="rounded-xl">
              <div className="text-blue-600 text-xl">≡</div>
              <p className="text-sm font-medium text-gray-800">Categorías organizadas</p>
              <p className="text-xs">Técnicas, creativas, de comunicación y más.</p>
            </div>

            <div className="rounded-xl">
              <div className="text-blue-600 text-xl">□</div>
              <p className="text-sm font-medium text-gray-800">Detalle de cada skill</p>
              <p className="text-xs">Nivel, descripción, habilidades relacionadas.</p>
            </div>

            <div className="rounded-xl">
              <div className="text-blue-600 text-xl">👥</div>
              <p className="text-sm font-medium text-gray-800">Comunidad activa</p>
              <p className="text-xs">Explora los perfiles de otros usuarios.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}