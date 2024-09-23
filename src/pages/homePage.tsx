import { useLogGA } from "@src/hooks/ga/useLogGA";
import PageTemplate from "../components/common/PageTemplate";
import Home from "../components/home";


const HomePage = () => {
  
  return (
    <PageTemplate>
      <Home />
    </PageTemplate>
  );
};

export default HomePage;
