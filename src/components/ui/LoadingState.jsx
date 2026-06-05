export default function LoadingState({ message = "Cargando..." }) {
  return (
    <p className="text-sm text-muted-foreground py-10 text-center">{message}</p>
  )
}