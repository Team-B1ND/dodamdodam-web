import { useGetBanStatusQuery } from "@/entities/night-study/queries";

const BanStatus = () => {
  const { data } = useGetBanStatusQuery();

  if (data.data)
    return (
      <div className="w-full h-24 bg-status-error text-static-white rounded-medium flex flex-col items-center gap-1">
        <p className="text-body1 font-medium">
          {data.data.endAt.replace("-", ".")}까지 심야자습 정지
        </p>
        <p className="text-headline font-bold text-center">
          {data.data.reason}
        </p>
      </div>
    );
};

export default BanStatus;
