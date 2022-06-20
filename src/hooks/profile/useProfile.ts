import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useGetMyProfile } from "../../querys/profile/profile.query";
import { profileAtom } from "../../store/profile/profileStore";

const useProfile = () => {
  const navigate = useNavigate();

  const profileData = useGetMyProfile({
    cacheTime: 1000 * 60 * 60,
    staleTime: 1000 * 60 * 5,
    onError: () => navigate("/sign"),
  }).data?.data.memberData;

  const [profile, setProfile] = useRecoilState(profileAtom);

  useEffect(() => {
    if (profileData) {
      setProfile(profileData);
    }
  }, [profileData, setProfile]);

  return {};
};

export default useProfile;
