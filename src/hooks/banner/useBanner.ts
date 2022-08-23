import { useEffect, useState } from "react";
import { useGetBanners } from "../../querys/banner/banner.query";
import { Banner } from "../../types/banner/banner.type";

const useBanner = () => {
  const bannersData = useGetBanners({
    cacheTime: 1000 * 60 * 60,
    staleTime: 1000 * 60 * 30,
  }).data?.data;

  const [approveBanners, setApproveBanners] = useState<Banner[]>([]);

  useEffect(() => {
    if (bannersData) {
      const validApprovedBanners = bannersData.filter(
        (banner) => banner.status !== "DEACTIVETED"
      );

      setApproveBanners(validApprovedBanners);
    }
  }, [bannersData]);

  return { approveBanners };
};

export default useBanner;
