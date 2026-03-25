import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/schedule/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/schedule/"!</div>
}
