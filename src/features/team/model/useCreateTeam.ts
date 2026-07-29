import { TeamApi } from "@/entities/team/api";
import {
  useCreateTeamMutation,
  useInviteTeamMutation,
} from "@/entities/team/mutations";
import { useImageUpload } from "@/shared/hooks/useImageUpload";
import { useToast } from "@b1nd/dodam-design-system/components";
import { useRef } from "react";

interface CreateTeamInput {
  name: string;
  description: string;
  image: File;
  members: string[];
}

export const useCreateTeam = () => {
  const isSubmittingRef = useRef(false);
  const toast = useToast();
  const { uploadImage, isPending: isUploadPending } = useImageUpload();
  const { mutateAsync: createTeam, isPending: isCreatePending } =
    useCreateTeamMutation();
  const { mutateAsync: inviteTeam, isPending: isInvitePending } =
    useInviteTeamMutation();

  const submit = async ({
    name,
    description,
    image,
    members,
  }: CreateTeamInput) => {
    if (isSubmittingRef.current) return false;

    isSubmittingRef.current = true;
    let isTeamCreated = false;

    try {
      const uploadedImage = await uploadImage(image, {
        allowType: "IMAGE",
      });

      await createTeam({
        name: name.trim(),
        description: description.trim(),
        imageUrl: uploadedImage.url,
      });
      isTeamCreated = true;

      // ponytail: 생성 응답에 publicId가 추가되면 이 조회 단계는 제거한다.
      const teams = await TeamApi.getMyTeams();
      const createdTeam = teams.data.content.find(
        (team) => team.imageUrl === uploadedImage.url,
      );

      if (!createdTeam?.publicId) {
        toast.warning("팀은 생성했지만 팀원을 초대하지 못했어요.");
        return true;
      }

      await inviteTeam({
        publicId: createdTeam.publicId,
        members,
      });
      toast.success("팀을 생성하고 팀원을 초대했어요.");

      return true;
    } catch {
      if (isTeamCreated) {
        toast.warning("팀은 생성했지만 팀원을 초대하지 못했어요.");
      }

      return false;
    } finally {
      isSubmittingRef.current = false;
    }
  };

  return {
    submit,
    isPending: isUploadPending || isCreatePending || isInvitePending,
  };
};
