import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(role)/admin/_adminLayout/app-in/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <section className='large-container'>
      <h1 className='text-heading1 font-bold'>앱인도담</h1>
    </section>
  )
}
