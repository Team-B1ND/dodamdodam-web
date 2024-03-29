import { useGetMyPermissionQuery } from "@src/queries/permission/permission.query";
import { useEffect, useState } from "react";
import { useGetBannersQuery } from "@src/queries/banner/banner.query";
import { Banner } from "@src/types/banner/banner.type";

const useBanner = () => {
  const bannersData = useGetBannersQuery({
    cacheTime: 1000 * 60 * 60,
    staleTime: 1000 * 60 * 30,
  }).data?.data;

  const permissionData = useGetMyPermissionQuery({
    cacheTime: 1000 * 60 * 60 * 24,
    staleTime: 1000 * 60 * 30 * 24,
  }).data?.data;

  const [approveBanners, setApproveBanners] = useState<Banner[]>([]);
  const [isBannerAuthority, setIsBanneerAuthority] = useState<boolean>(false);

  useEffect(() => {
    if (permissionData) {
      if (
        permissionData.find(
          (permission) => permission.permission === "CTRL_BANNER"
        )
      ) {
        setIsBanneerAuthority(true);
      } else {
        setIsBanneerAuthority(false);
      }
    }
  }, [permissionData]);

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
