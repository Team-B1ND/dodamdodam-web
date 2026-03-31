import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(role)/admin/_adminLayout/(user)/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(role)/admin/(user)/"!</div>
}
