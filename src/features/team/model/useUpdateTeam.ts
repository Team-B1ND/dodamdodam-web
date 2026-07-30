import {
  useInviteTeamMutation,
  useUpdateTeamMutation,
} from "@/entities/team/mutations";
import { useImageUpload } from "@/shared/hooks/useImageUpload";
import { useToast } from "@b1nd/dodam-design-system/components";
import { useRef } from "react";

interface UpdateTeamInput {
  publicId: string;
  name: string;
  description: string;
  currentImageUrl: string | null;
  image: File | null;
  members: string[];
}

export const useUpdateTeam = () => {
  const isSubmittingRef = useRef(false);
  const toast = useToast();
  const { uploadImage, isPending: isUploadPending } = useImageUpload();
  const { mutateAsync: updateTeam, isPending: isUpdatePending } =
    useUpdateTeamMutation();
  const { mutateAsync: inviteTeam, isPending: isInvitePending } =
    useInviteTeamMutation();

  const submit = async ({
    publicId,
    name,
    description,
    currentImageUrl,
    image,
    members,
  }: UpdateTeamInput) => {
    if (isSubmittingRef.current) return false;

    isSubmittingRef.current = true;
    let isTeamUpdated = false;

    try {
      const imageUrl = image
        ? (await uploadImage(image, { allowType: "IMAGE" })).url
        : currentImageUrl;

      await updateTeam({
        publicId,
        name: name.trim(),
        description: description.trim(),
        ...(imageUrl ? { imageUrl } : {}),
      });
      isTeamUpdated = true;

      if (members.length) {
        await inviteTeam({ publicId, members });
      }

      return true;
    } catch {
      if (isTeamUpdated) {
        toast.warning("팀 정보는 수정했지만 일부 팀원을 초대하지 못했어요.");
        return true;
      }

      return false;
    } finally {
      isSubmittingRef.current = false;
    }
  };

  return {
    submit,
    isPending: isUploadPending || isUpdatePending || isInvitePending,
  };
};
