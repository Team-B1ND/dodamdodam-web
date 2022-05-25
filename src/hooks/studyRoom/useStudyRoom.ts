import { useState } from "react";

const useStudyRoom = () => {
  const [section, setSection] = useState("자습실");

  return { section, setSection };
};

export default useStudyRoom;
