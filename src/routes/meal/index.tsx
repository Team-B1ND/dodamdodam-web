import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/meal/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/meal/"!</div>
}
