import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/nightStudy/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/nightStudy/"!</div>
}
