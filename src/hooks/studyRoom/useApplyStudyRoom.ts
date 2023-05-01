import { useCallback, useEffect, useState } from "react";
import {
  useGetMyDefaultStudyRoomsQuery,
  useGetMyStudyRoomsQuery,
  usePostApplyStudyRoomsMutation,
} from "@src/queries/studyRoom/studyRoom.query";
import {
  ApplyStudyRoom,
  DefaultStudyRoom,
} from "@src/types/studyRoom/studyRoom.type";
import dateTransform from "@src/util/transform/dateTransform";
import { useQueryClient } from "react-query";
import { useGetTimeTableQuery } from "@src/queries/timeTable/timeTable.query";
import { useGetPlacesQuery } from "@src/queries/place/place.query";
import dateCheck from "@src/util/check/dateCheck";
import showToast from "@src/lib/toast/toast";
import { usePostModuleLogMutation } from "@src/queries/log/log.query";
import { captureException, withScope } from "@sentry/react";

const useApplyStudyRoom = () => {
  const queryClient = useQueryClient();

  const timeTables = useGetTimeTableQuery({
    suspense: true,
    cacheTime: 1000 * 60 * 60 * 12,
    staleTime: 1000 * 60 * 60 * 12,
  }).data?.data;

  const myAppliedStudyRoomsData = useGetMyStudyRoomsQuery({
    suspense: true,
    staleTime: 1000 * 30,
    cacheTime: 1000 * 60,
  }).data?.data;

  const { data: studyRoomsData } = useGetPlacesQuery({
    suspense: true,
    staleTime: 1000 * 60 * 60 * 12,
    cacheTime: 1000 * 60 * 60 * 12,
  });

  const myDefaultApplyStudyRoomsData = useGetMyDefaultStudyRoomsQuery({
    suspense: true,
    cacheTime: 1000 * 60 * 60,
    staleTime: 1000 * 60 * 60,
  }).data?.data;

  const postApplyStudyRoomsMutation = usePostApplyStudyRoomsMutation();
  const postModuleLogMutation = usePostModuleLogMutation();

  //기본위치 신청할지 말지 구분하는 함수
  const [isDefault, setIsDefault] = useState(false);
  const [myApplyStudyRooms, setMyApplyStudyRooms] = useState<ApplyStudyRoom[]>([
    { placeId: null, timeTableId: 0 },
    { placeId: null, timeTableId: 0 },
    { placeId: null, timeTableId: 0 },
    { placeId: null, timeTableId: 0 },
  ]);
  //사용자가 자습실을 바꾸지 않고 다시 신청했을 때 확인하기 위해 신청한 자습실을 복사한 데이터
  const [tempMyApplyStudyRooms, setTempMyApplyStudyRooms] = useState<
    ApplyStudyRoom[]
  >([
    { placeId: null, timeTableId: 0 },
    { placeId: null, timeTableId: 0 },
    { placeId: null, timeTableId: 0 },
    { placeId: null, timeTableId: 0 },
  ]);
  const [myDefaultApplyStudyRooms, setMyDefaultApplyStudyRooms] = useState<
    DefaultStudyRoom[]
  >([]);

  //4개의 자습실을 다 신청했으면 수정 버튼을 띄우고, 하나라도 하지 않았으면 기본 위치 신청 버튼을 뛰우는 부분
  useEffect(() => {
    studyRoomAllApplyCheck();
  }, [tempMyApplyStudyRooms]);

  useEffect(() => {
    if (myDefaultApplyStudyRoomsData) {
      setMyDefaultApplyStudyRooms(myDefaultApplyStudyRoomsData);
    }
  }, [myDefaultApplyStudyRoomsData]);

  const initialStudyRoomMapping = useCallback(() => {
    //내가 신청한 자습실 및 자습실 정보까지 모두 불러와졌을때
    if (myAppliedStudyRoomsData && timeTables) {
      // 내가 신청했던 자습실은 신청했던 상태로 저장하고 안 했던 것은 placeId를 null로해서 저장함
      let handleApplyStudyRooms: ApplyStudyRoom[] = timeTables?.map(
        (timeTable, idx) => {
          let handleApplyStudyRoom: ApplyStudyRoom;

          if (myAppliedStudyRoomsData[idx]) {
            handleApplyStudyRoom = {
              placeId: myAppliedStudyRoomsData[idx].place.id,
              timeTableId: timeTable.id,
            };
          } else {
            handleApplyStudyRoom = {
              placeId: null,
              timeTableId: timeTable.id,
            };
          }

          return handleApplyStudyRoom;
        }
      );

      setMyApplyStudyRooms(handleApplyStudyRooms);
      setTempMyApplyStudyRooms(handleApplyStudyRooms);
    }
  }, [myAppliedStudyRoomsData, timeTables]);

  //처음 들어왔을때 내가 신청했던 자습실을 토대로 맵핑해주는 코드
  useEffect(() => {
    initialStudyRoomMapping();
  }, [initialStudyRoomMapping]);

  const studyRoomAllApplyCheck = useCallback(() => {
    setIsDefault(false);
    if (tempMyApplyStudyRooms?.length !== 0 && timeTables) {
      tempMyApplyStudyRooms.forEach((tempMyApplyStudyRoom, idx) => {
        if (
          tempMyApplyStudyRoom.placeId === null &&
          !dateCheck.dateIsAfterCheck(
            `${dateTransform.hyphen()} ${timeTables[idx].startTime}`,
            "YYYY-MM-DD HH:mm",
            "minute"
          )
        ) {
          setIsDefault(true);
        }
      });
    }
  }, [tempMyApplyStudyRooms, timeTables]);

  const handleStudyRoomApply = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target;
    const places = studyRoomsData?.data!;

    const handleApplyStudyRoom: ApplyStudyRoom = {
      placeId: places.find((place) => place.name === value)?.id!,
      timeTableId: Number(name),
    };

    //사용자가 바꾼 자습실 이름을 가지고 자습실 정보에서 찾아서 저장
    setMyApplyStudyRooms((prev) =>
      prev.map((myApplyStudyRoom) =>
        myApplyStudyRoom.timeTableId === Number(name)
          ? handleApplyStudyRoom
          : myApplyStudyRoom
      )
    );

    setIsDefault(false);
  };

  const submitDefaultSutdyRoom = async () => {
    if (postApplyStudyRoomsMutation.isLoading) {
      return;
    }

    let handleApplyStudyRoomList: ApplyStudyRoom[] = myApplyStudyRooms.map(
      (myApplyStudyRoom, idx) => {
        let handleApplyStudyRoom: ApplyStudyRoom;

        if (!myApplyStudyRoom.placeId) {
          handleApplyStudyRoom = {
            placeId: myDefaultApplyStudyRooms[idx].place.id,
            timeTableId: myApplyStudyRoom.timeTableId,
          };
        } else {
          handleApplyStudyRoom = myApplyStudyRoom;
        }

        return handleApplyStudyRoom;
      }
    );

    postApplyStudyRoomsMutation.mutateAsync(
      {
        studyRoomList: handleApplyStudyRoomList,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries("studyRoom/getMyStudyRooms");
          postModuleLogMutation.mutate({
            moduleName: "메인/자습실신청",
            description: "자습실 기본 위치 신청",
          });
          showToast("기본 위치 신청 성공", "SUCCESS");
          setMyApplyStudyRooms(handleApplyStudyRoomList);
          setTempMyApplyStudyRooms(handleApplyStudyRoomList);
        },
        onError: (err, query) => {
          showToast("기본 위치 신청 실패", "ERROR");
          withScope((scope) => {
            scope.setContext("query", { queryHash: query.studyRoomList });
            captureException(
              `${query.studyRoomList}가 ${err}로 인해 기본위치 신청 실패`
            );
          });
        },
      }
    );
  };

  const submitApplyStudyRoomData = async () => {
    if (postApplyStudyRoomsMutation.isLoading) {
      return;
    }

    let isTempSame: boolean = true;

    myApplyStudyRooms.forEach((myApplyStudyRoom, idx) => {
      if (myApplyStudyRoom !== tempMyApplyStudyRooms[idx]) {
        isTempSame = false;
      }
    });

    if (isTempSame) {
      showToast("위치를 선택해주세요", "INFO");
      return;
    }

    let handleApplyStudyRoomList: ApplyStudyRoom[] = [];
    myApplyStudyRooms.forEach((myApplyStudyRoom) => {
      if (myApplyStudyRoom.placeId) {
        handleApplyStudyRoomList.push(myApplyStudyRoom);
      }
    });

    postApplyStudyRoomsMutation.mutateAsync(
      {
        studyRoomList: handleApplyStudyRoomList,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries("studyRoom/getMyStudyRooms");
          showToast("위치 신청 성공", "SUCCESS");
          postModuleLogMutation.mutate({
            moduleName: "메인/자습실신청",
            description: "자습실 위치 신청",
          });
          setTempMyApplyStudyRooms(myApplyStudyRooms);
        },
        onError: (err, query) => {
          setMyApplyStudyRooms(tempMyApplyStudyRooms);
          showToast("위치 신청 실패", "ERROR");
          withScope((scope) => {
            scope.setContext("query", { queryHash: query.studyRoomList });
            captureException(
              `${query.studyRoomList}가 ${err}이유로 위치 신청 실패`
            );
          });
        },
      }
    );
  };

  return {
    timeTables,
    isDefault,
    myApplyStudyRooms,
    studyRoomsData: studyRoomsData?.data,
    handleStudyRoomApply,
    submitApplyStudyRoomData,
    submitDefaultSutdyRoom,
  };
};

export default useApplyStudyRoom;
