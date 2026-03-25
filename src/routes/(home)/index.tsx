import TimeTable from '@/features/get-time-table/ui';
import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react';

export const Route = createFileRoute('/(home)/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex grow gap-6 h-full">
      <div className="flex flex-col gap-4 grow">
        <header className="flex justify-center items-center bg-background-surface aspect-[6.8/1] rounded-large">
          Header
        </header>
        <main className="flex grow gap-4">
          <div className="flex flex-col gap-4 grow">
            <Suspense fallback={<TimeTable.Skeleton/>}> 
              <TimeTable />
            </Suspense>
          </div>
          <div className="flex flex-col gap-4 grow">
          </div>
        </main>
      </div>
      <aside className="flex justify-center items-center w-72 h-80 bg-background-surface rounded-large">
        aside
      </aside>
    </div>
  );
}
