import { useLogGA } from "@src/hooks/ga/useLogGA";
import PageTemplate from "../components/common/PageTemplate";
import Home from "../components/home";
import useTokenCheck from "../hooks/auth/useTokenCheck";

const HomePage = () => {
  useTokenCheck();
  const { handleGALogEvent } = useLogGA();

  return (
    <PageTemplate>
      <Home />
    </PageTemplate>
  );
};

export default HomePage;
