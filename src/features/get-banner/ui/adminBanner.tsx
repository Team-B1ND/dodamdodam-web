import { useGetBanner } from "@/features/get-banner/model/useGetBanner";
import { Switch } from "@b1nd/dodam-design-system/components";

const AdminBanner = () => {
  const { data } = useGetBanner();

  return (
    <section className="large-container grow">
      <h1 className="text-heading1 font-bold">배너 목록</h1>
      {data.map((item) => (
        <div key={item.id}>
          <img
            src={item.imageUrl}
            alt={`${item.id}_${item.linkUrl}`}
            className="w-full aspect-6.5/1 rounded-large"
          />
          <Switch checked={item.isActive} onChange={() => console.log("switch -> " + item.id)} />
        </div>
      ))}
    </section>
  );
}

export default AdminBanner