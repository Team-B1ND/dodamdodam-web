import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(role)/admin/_adminLayout/app-in/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(role)/admin/_adminLayout/app-in/"!</div>
}
