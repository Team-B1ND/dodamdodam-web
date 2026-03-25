import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/night-study/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/nightStudy/"!</div>
}
