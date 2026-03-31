import { useGetBanner } from "@/features/get-banner/model/useGetBanner";
import { colors } from "@b1nd/dodam-design-system/colors";
import { Indicator, Switcher } from "@b1nd/dodam-design-system/components";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

const Banner = () => {
  const { data } = useGetBanner();
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const pages = data.map((item) =>
    item.linkUrl.startsWith("/") ? (
      <img
        src={item.imageUrl}
        alt=""
        onClick={() => navigate({ to: item.linkUrl })}
        className="cursor-pointer w-full aspect-6.5/1 rounded-large"
      />
    ) : (
      <a href={item.linkUrl}>
        <img
          src={item.imageUrl}
          alt={`banner_${item.id}`}
          className="w-full aspect-6.5/1 rounded-large"
        />
      </a>
    ),
  );

  return (
    <header className="relative flex flex-col gap-3 cursor-pointer bg-background-surface">
      <Switcher pages={pages} current={page} animated/>
      <div className="absolute bottom-2.5 w-full flex justify-center">
        <Indicator color={colors.static.white} total={data.length} current={page} onChangePage={setPage} />
      </div>
    </header>
  );
};

Banner.Skeleton = () => {
  return <header className="w-full aspect-6.5/1 rounded-large bg-background-surface" />
}

export default Banner;
