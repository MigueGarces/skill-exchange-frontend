export default function ErrorMessage({ message = "Ocurrió un error." }) {
  return (
    <p className="text-sm text-destructive py-10 text-center">{message}</p>
  )
}