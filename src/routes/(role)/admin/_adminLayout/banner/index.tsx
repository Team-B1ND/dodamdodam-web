import CreateBanner from '@/features/create-banner/ui'
import AdminBanner from '@/features/get-banner/ui/adminBanner'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(role)/admin/_adminLayout/banner/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='flex gap-4'>
      <AdminBanner />
      <CreateBanner/>
    </div>
  )
}
