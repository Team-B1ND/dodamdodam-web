import { AppApi } from "@/entities/app/api";
import { APP_QUERY_KEY } from "@/entities/app/constants";
import { InAppTeamApi } from "@/entities/in-app-team/api";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const getAppList = async ({ page }: { page: number }) => {
  const response = await AppApi.getApps({ page });
  const content = await Promise.all(
    response.data.content.map(async (app) => {
      const appDetail = await AppApi.getAppDetail(app.appId);
      const team = await InAppTeamApi.getTeam(appDetail.data.teamId);

      return {
        ...app,
        teamName: team.data.name,
        githubUrl: team.data.githubUrl,
        releases: appDetail.data.releases,
      };
    }),
  );

  return {
    ...response,
    data: {
      ...response.data,
      content,
    },
  };
};

export const useManageAppIn = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery({
      queryKey: APP_QUERY_KEY,
      queryFn: ({ pageParam }) => getAppList({ page: pageParam }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, _allPages, lastPageParam) =>
        lastPage.data.hasNext ? lastPageParam + 1 : undefined,
    });
  const apps = data.pages.flatMap((page) => page.data.content);
  const releaseRequests = apps.flatMap((app) =>
    app.releases
      .filter((release) => release.status === "PENDING")
      .map((release) => ({ app, release })),
  );
  const { ref: appEndRef, inView: appInView } = useInView();
  const { ref: releaseEndRef, inView: releaseInView } = useInView();

  useEffect(() => {
    if ((appInView || releaseInView) && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [
    appInView,
    releaseInView,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  ]);

  return {
    apps,
    appEndRef,
    hasNextPage,
    isFetchingNextPage,
    releaseEndRef,
    releaseRequests,
  };
};
