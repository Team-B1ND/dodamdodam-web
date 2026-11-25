import {
  formatPeriodsLabel,
  formatWeekendStudyDate,
} from "@/entities/weekend-study/constants";
import {
  useDeleteWeekendStudyRoomMutation,
  useUnblockWeekendStudyRoomMutation,
} from "@/entities/weekend-study/mutations";
import {
  useGetWeekendStudyRoomBlocksQueries,
  useGetWeekendStudyRoomsQuery,
} from "@/entities/weekend-study/queries";
import type { WeekendStudyRoom } from "@/entities/weekend-study/types";
import QueryBoundary from "@/shared/ui/query-boundary";
import {
  Dialog,
  FilledButton,
  useOverlay,
  useToast,
} from "@b1nd/dodam-design-system/components";
import dayjs from "dayjs";
import type { ReactNode } from "react";
import RoomBlockDialog from "./RoomBlockDialog";
import RoomFormDialog from "./RoomFormDialog";
import WeekendTable, { type WeekendTableColumn } from "./WeekendTable";

const ROOM_COLUMNS: WeekendTableColumn[] = [
  { label: "실 이름", width: "200px" },
  { label: "층" },
  { label: "제어", width: "140px", align: "right" },
];

const BLOCK_COLUMNS: WeekendTableColumn[] = [
  { label: "실", width: "140px" },
  { label: "날짜", width: "200px" },
  { label: "시간", width: "140px" },
  { label: "반복", width: "100px" },
  { label: "사유" },
  { label: "제어", width: "80px", align: "right" },
];

const Section = ({
  title,
  description,
  action,
  children,
}: {
  title: string;
  description: string;
  action: ReactNode;
  children: ReactNode;
}) => (
  <section className="flex flex-col gap-4">
    <div className="flex items-start justify-between gap-3">
      <div className="flex flex-col gap-1">
        <h2 className="text-headline font-bold">{title}</h2>
        <p className="text-caption1 text-text-tertiary">{description}</p>
      </div>
      {action}
    </div>
    {children}
  </section>
);

const RoomList = () => {
  const { open } = useOverlay();
  const { data } = useGetWeekendStudyRoomsQuery();
  const { mutateAsync: deleteRoom, isPending } =
    useDeleteWeekendStudyRoomMutation();

  const openEdit = (room: WeekendStudyRoom) =>
    open(({ close, exit, isOpen }) => (
      <RoomFormDialog
        room={room}
        isOpen={isOpen}
        onClose={() => {
          close();
          exit();
        }}
      />
    ));

  const openDelete = (room: WeekendStudyRoom) =>
    open(({ close, exit, isOpen }) => (
      <Dialog
        open={isOpen}
        title={`${room.name}을(를) 삭제할까요?`}
        description="삭제한 실은 학생 신청 목록에서 사라져요."
      >
        <Dialog.FilledButton
          role="assistive"
          disabled={isPending}
          onClick={() => {
            close();
            exit();
          }}
        >
          취소
        </Dialog.FilledButton>
        <Dialog.FilledButton
          role="negative"
          disabled={isPending}
          onClick={async () => {
            await deleteRoom(room.id);
            close();
            exit();
          }}
        >
          삭제
        </Dialog.FilledButton>
      </Dialog>
    ));

  return (
    <WeekendTable
      columns={ROOM_COLUMNS}
      rowHeight={56}
      minWidth="28rem"
      emptyText="등록된 실이 없어요."
      rows={data.data.map((room) => ({
        key: String(room.id),
        cells: [
          <span className="font-bold">{room.name}</span>,
          `${room.floor}층`,
          <div className="flex justify-end gap-2">
            <FilledButton
              role="assistive"
              size="small"
              display="inline"
              onClick={() => openEdit(room)}
            >
              수정
            </FilledButton>
            <FilledButton
              role="negative"
              size="small"
              display="inline"
              onClick={() => openDelete(room)}
            >
              삭제
            </FilledButton>
          </div>,
        ],
      }))}
    />
  );
};

const BlockList = ({ rooms }: { rooms: WeekendStudyRoom[] }) => {
  const toast = useToast();
  const results = useGetWeekendStudyRoomBlocksQueries(rooms);
  const { mutateAsync: unblock, isPending } =
    useUnblockWeekendStudyRoomMutation({
      notify: false,
    });

  /** 서버는 교시마다 차단 항목을 따로 저장해서, 같은 등록 건(실·기간·사유)끼리 묶어 보여줘요. */
  const groups = rooms.flatMap((room, idx) => {
    const map = new Map<
      string,
      {
        room: WeekendStudyRoom;
        startAt: string;
        endAt: string;
        description: string;
        periods: number[];
        ids: number[];
      }
    >();
    results[idx].data.data.forEach((block) => {
      const key = `${block.startAt}|${block.endAt}|${block.description}`;
      const group = map.get(key) ?? {
        room,
        startAt: block.startAt,
        endAt: block.endAt,
        description: block.description,
        periods: [],
        ids: [],
      };
      group.periods.push(block.period);
      group.ids.push(block.id);
      map.set(key, group);
    });
    return [...map.values()];
  });

  const handleDelete = async (group: (typeof groups)[number]) => {
    const settled = await Promise.allSettled(
      group.ids.map((blockId) => unblock({ roomId: group.room.id, blockId })),
    );
    if (settled.some((result) => result.status === "rejected")) {
      toast.error("사용 제한을 해제하지 못했어요.");
    } else {
      toast.success("사용 제한을 해제했어요.");
    }
  };

  return (
    <WeekendTable
      columns={BLOCK_COLUMNS}
      rowHeight={56}
      minWidth="48rem"
      emptyText="등록된 사용 제한이 없어요."
      rows={groups.map((group) => {
        const isRepeat = group.startAt !== group.endAt;
        const endAt = dayjs(group.endAt);
        return {
          key: `${group.room.id}-${group.ids.join(",")}`,
          cells: [
            <span className="font-bold">{group.room.name}</span>,
            isRepeat
              ? `${formatWeekendStudyDate(group.startAt)} ~ ${endAt.month() + 1}월 ${endAt.date()}일`
              : formatWeekendStudyDate(group.startAt),
            formatPeriodsLabel(group.periods),
            isRepeat ? "매주 반복" : "없음",
            <span className="whitespace-normal">{group.description}</span>,
            <div className="flex justify-end">
              <FilledButton
                role="assistive"
                size="small"
                display="inline"
                disabled={isPending}
                onClick={() => handleDelete(group)}
              >
                제한 해제
              </FilledButton>
            </div>,
          ],
        };
      })}
    />
  );
};

const BlockSection = () => {
  const { open } = useOverlay();
  const { data } = useGetWeekendStudyRoomsQuery();

  const openAdd = () =>
    open(({ close, exit, isOpen }) => (
      <RoomBlockDialog
        rooms={data.data}
        isOpen={isOpen}
        onClose={() => {
          close();
          exit();
        }}
      />
    ));

  return (
    <Section
      title="사용 제한"
      description="특정 실·날짜·시간을 신청 불가로 막습니다."
      action={
        <FilledButton
          role="primary"
          size="medium"
          display="inline"
          disabled={data.data.length === 0}
          onClick={openAdd}
        >
          사용 제한 추가
        </FilledButton>
      }
    >
      <QueryBoundary
        pendingFallback={
          <WeekendTable.Skeleton columns={BLOCK_COLUMNS} count={3} />
        }
      >
        <BlockList rooms={data.data} />
      </QueryBoundary>
    </Section>
  );
};

const RoomManagement = () => {
  const { open } = useOverlay();

  const openAdd = () =>
    open(({ close, exit, isOpen }) => (
      <RoomFormDialog
        isOpen={isOpen}
        onClose={() => {
          close();
          exit();
        }}
      />
    ));

  return (
    <div className="flex flex-col gap-6 pt-1 min-w-0">
      <Section
        title="대여 가능 실"
        description="학생이 주말 자습 실 대여로 신청할 수 있는 실을 관리합니다."
        action={
          <FilledButton
            role="primary"
            size="medium"
            display="inline"
            onClick={openAdd}
          >
            실 추가
          </FilledButton>
        }
      >
        <QueryBoundary
          pendingFallback={<WeekendTable.Skeleton columns={ROOM_COLUMNS} />}
        >
          <RoomList />
        </QueryBoundary>
      </Section>
      <div className="w-full h-px bg-border-normal" />
      <QueryBoundary
        pendingFallback={
          <WeekendTable.Skeleton columns={BLOCK_COLUMNS} count={3} />
        }
      >
        <BlockSection />
      </QueryBoundary>
    </div>
  );
};

export default RoomManagement;
