import { useState } from "react";

const useApply = () => {
  const [section, setSection] = useState("자습실");

  return { section, setSection };
};

export default useApply;
