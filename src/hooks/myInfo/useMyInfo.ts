import { useState } from "react";

const useMyInfo = () => {
  const [section, setSection] = useState("알림");

  return { section, setSection };
};

export default useMyInfo;
