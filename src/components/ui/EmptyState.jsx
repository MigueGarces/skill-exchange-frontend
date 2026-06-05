export default function EmptyState({ message = "No hay resultados para mostrar." }) {
  return (
    <p className="text-sm text-muted-foreground py-10 text-center">{message}</p>
  )
}