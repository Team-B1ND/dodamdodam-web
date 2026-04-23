import { SegmentedButton, type SegmentedButtonData } from '@b1nd/dodam-design-system/components'
import { useGetMeQuery } from '@/entities/user/queries';
import { createFileRoute, Navigate, Outlet, useNavigate } from '@tanstack/react-router'
import { useState } from 'react';

export const Route = createFileRoute('/(role)/admin/_adminLayout')({
  component: RouteComponent,
})

function RouteComponent() {
  const [page, setPage] = useState<SegmentedButtonData[]>([
    { text: "유저", value: "", isActive: true },
    { text: "배너", value: "banner", isActive: false },
  ]);
  const navigate = useNavigate();
  const { data: meData, isPending, isError } = useGetMeQuery();
  const isAdmin = meData?.data.roles.includes("ADMIN") ?? false;

  if (isPending) {
    return <div className="large-container h-16 skeleton" />;
  }

  if (isError || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className='flex flex-col gap-4 h-fit min-h-0'>
      <header className='large-container'>
        <SegmentedButton 
          data={page} 
          setData={setPage} 
          onBlockClick={(v) => navigate({ to: `/admin/${v}` })}
        />
      </header>
      <Outlet/>
    </div>
  )
}
