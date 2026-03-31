import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(role)/admin/_adminLayout/banner/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='flex flex-col large-container gap-5'>
      배너 목록
      
    </div>
  )
}
