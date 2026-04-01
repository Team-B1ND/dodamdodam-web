import { useGetBanner } from "@/features/get-banner/model/useGetBanner";
import { Switch } from "@b1nd/dodam-design-system/components";

const AdminBanner = () => {
  const { data } = useGetBanner();

  return (
    <section className="flex flex-col gap-5 large-container grow">
      <h1 className="text-heading1 font-bold">배너 목록</h1>
      <div className="grid grid-rows-1 gap-5">
        {data.map((item) => (
          <div key={item.id} className="flex items-center gap-4 min-w-0">
            <div className="flex-1 min-w-0">
              <img
                src={item.imageUrl}
                alt={`${item.id}_${item.linkUrl}`}
                className="w-full aspect-6.5/1 object-cover rounded-large"
              />
            </div>
            <div className="shrink-0">
              <Switch checked={item.isActive} onChange={() => console.log("switch -> " + item.id)} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

AdminBanner.Skeleton = () => {
  return (
    <section className="flex flex-col gap-5 large-container grow">
      <h1 className="text-heading1 font-bold">배너 목록</h1>
      <div className="flex flex-col gap-3">
        {Array.from({ length: 5 }).map((_, idx) => <div key={idx} className="w-full aspect-7/1 skeleton rounded-medium" />)}
      </div>
    </section>
  );
}

export default AdminBanner
