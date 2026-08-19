import { useManageApp } from "@/features/manage-app-in/model/useManageApp";
import { useManageAppIn } from "@/features/manage-app-in/model/useManageAppIn";
import { useManageAppRelease } from "@/features/manage-app-in/model/useManageAppRelease";
import { colors } from "@b1nd/dodam-design-system/colors";
import {
  FilledButton,
  IconButton,
  Table,
  type TableKey,
} from "@b1nd/dodam-design-system/components";
import { Eye, EyeSlash } from "@b1nd/dodam-design-system/icons";

const APP_TABLE_KEYS: TableKey[] = [
  ["팀명", "96px"],
  ["앱명", "142px"],
  ["깃허브 주소", "FULL"],
  ["서비스 표시", "90px"],
  ["상태 제어", "90px"],
];
const getReleaseVersion = (releaseUrl: string) =>
  releaseUrl.split("/").filter(Boolean).pop()?.replace(/^v/, "") ?? "-";

const AdminAppIn = () => {
  const {
    isDeleting,
    isUpdatingVisibility,
    openDeleteDialog,
    updateAppVisibility,
  } = useManageApp();
  const { allowRelease, isAllowing, openDenyDialog } = useManageAppRelease();
  const {
    apps,
    appEndRef,
    hasNextPage,
    isFetchingNextPage,
    releaseEndRef,
    releaseRequests,
  } = useManageAppIn();

  const rows = apps.map((app) => [
    app.teamName,
    <span className="block truncate" key={`${app.appId}-name`}>
      {app.name}
    </span>,
    app.githubUrl ? (
      <a
        className="block max-w-full truncate underline"
        href={app.githubUrl}
        key={`${app.appId}-github`}
        rel="noreferrer"
        target="_blank"
      >
        {app.githubUrl}
      </a>
    ) : (
      "-"
    ),
    <div
      className="flex justify-center"
      key={`${app.appId}-visibility`}
      title={app.isVisible ? "서비스 숨기기" : "서비스 표시하기"}
    >
      <IconButton
        disabled={isUpdatingVisibility}
        icon={
          app.isVisible ? (
            <Eye color={colors.text.primary} />
          ) : (
            <EyeSlash color={colors.text.primary} />
          )
        }
        iconSize={24}
        onClick={() =>
          updateAppVisibility({
            appId: app.appId,
            visible: !app.isVisible,
          })
        }
        size={48}
      />
    </div>,
    <div className="flex justify-center" key={`${app.appId}-delete`}>
      <FilledButton
        disabled={isDeleting}
        display="inline"
        onClick={() => openDeleteDialog(app.appId, app.name)}
        role="negative"
        size="small"
      >
        삭제
      </FilledButton>
    </div>,
  ]);

  return (
    <section className="flex w-full min-w-0 flex-col gap-4 xl:flex-row xl:items-start">
      <div className="scrollbar h-[70vh] min-h-0 min-w-0 max-h-188.25 flex-1 overflow-auto rounded-large bg-background-surface p-4 sm:p-6">
        <div className="w-full min-w-0">
          {rows.length ? (
            <Table data={rows} keys={APP_TABLE_KEYS} />
          ) : (
            <p className="py-8 text-center text-body1 text-text-tertiary">
              등록된 앱이 없어요.
            </p>
          )}
          {isFetchingNextPage && (
            <div className="mt-3 flex flex-col gap-2">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  className="h-12 w-full rounded-medium skeleton"
                  key={index}
                />
              ))}
            </div>
          )}
          {hasNextPage && <div ref={appEndRef} className="h-2" />}
        </div>
      </div>

      <aside className="flex h-[70vh] min-h-0 min-w-0 w-full max-h-188.25 shrink-0 flex-col overflow-hidden rounded-large bg-background-surface p-4 sm:p-5 xl:w-105.5">
        <h1 className="text-headline font-bold">릴리즈 요청 목록</h1>
        <div className="scrollbar mt-4 min-h-0 flex-1 overflow-y-auto pr-1">
          <div className="flex flex-col gap-4">
            {releaseRequests.map(({ app, release }) => (
              <article
                className="flex flex-col gap-4 overflow-hidden rounded-large bg-fill-primary p-4"
                key={release.releaseId}
              >
                <a
                  className="min-h-12 min-w-0 overflow-hidden wrap-break-word text-body1 font-medium leading-6 underline"
                  href={release.releaseUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  {release.releaseUrl}
                </a>
                <div className="h-px w-full bg-border-normal" />
                <div className="grid grid-cols-1 gap-x-4 gap-y-3 text-label sm:grid-cols-2 sm:gap-x-6">
                  <div className="flex min-w-0 items-center gap-2 whitespace-nowrap">
                    <span className="font-bold text-text-secondary">팀명</span>
                    <span className="truncate font-semibold text-text-primary">
                      {app.teamName}
                    </span>
                  </div>
                  <div className="flex min-w-0 items-center gap-2 whitespace-nowrap">
                    <span className="font-bold text-text-secondary">
                      릴리즈 버전
                    </span>
                    <span className="truncate font-semibold text-text-primary">
                      {getReleaseVersion(release.releaseUrl)}
                    </span>
                  </div>
                  <div className="flex min-w-0 items-center gap-2 whitespace-nowrap">
                    <span className="font-bold text-text-secondary">앱명</span>
                    <span className="truncate font-semibold text-text-primary">
                      {app.name}
                    </span>
                  </div>
                  <div className="col-span-1 flex items-center justify-end gap-1 sm:col-span-2">
                    <FilledButton
                      disabled={isAllowing}
                      display="inline"
                      onClick={() => allowRelease(release.releaseId)}
                      role="primary"
                      size="small"
                    >
                      승인
                    </FilledButton>
                    <FilledButton
                      disabled={isAllowing}
                      display="inline"
                      onClick={() => openDenyDialog(release.releaseId)}
                      role="negative"
                      size="small"
                    >
                      거절
                    </FilledButton>
                  </div>
                </div>
              </article>
            ))}
            {!releaseRequests.length && !hasNextPage && (
              <p className="py-8 text-center text-body1 text-text-tertiary">
                릴리즈 요청이 없어요.
              </p>
            )}
            {hasNextPage && (
              <div className="h-2 shrink-0" ref={releaseEndRef} />
            )}
          </div>
        </div>
      </aside>
    </section>
  );
};

AdminAppIn.Skeleton = () => (
  <section className="flex w-full min-w-0 flex-col gap-4 xl:flex-row">
    <div className="h-[70vh] min-h-0 min-w-0 max-h-188.25 flex-1 rounded-large skeleton" />
    <div className="h-[70vh] min-h-0 w-full max-h-188.25 shrink-0 rounded-large skeleton xl:w-105.5" />
  </section>
);

export default AdminAppIn;
