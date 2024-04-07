import { useEffect, useState } from "react";
import { useGetBannersQuery } from "@src/queries/banner/banner.query";
import { Banner } from "@src/types/banner/banner.type";
import { useGetMyMemberQuery } from "@src/queries/member/member.query";

const useBanner = () => {
  const bannersData = useGetBannersQuery({
    cacheTime: 1000 * 60 * 60,
    staleTime: 1000 * 60 * 30,
  }).data?.data;

  const memberData = useGetMyMemberQuery({
    cacheTime: 1000 * 60 * 60 * 24,
    staleTime: 1000 * 60 * 30 * 24,
  }).data?.data;

  const [approveBanners, setApproveBanners] = useState<Banner[]>([]);
  const [isBannerAuthority, setIsBanneerAuthority] = useState<boolean>(false);

  useEffect(() => {
    if (memberData) {
      if (memberData.role === "ADMIN") {
        setIsBanneerAuthority(true);
      } else {
        setIsBanneerAuthority(false);
      }
    }
  }, [memberData]);

  useEffect(() => {
    if (bannersData) {
      const validApprovedBanners = bannersData.filter(
        (banner) => banner.status !== "DEACTIVETED"
      );

      setApproveBanners(validApprovedBanners);
    }
  }, [bannersData]);

  return { approveBanners, isBannerAuthority };
};

export default useBanner;
