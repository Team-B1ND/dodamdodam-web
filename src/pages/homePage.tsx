import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageTemplate from "../components/common/pageTemplate/pageTemplate";
import Home from "../components/home/home";
import { ACCESS_TOKEN_KEY } from "../constants/token/token.constant";
import useProfile from "../hooks/profile/useProfile";
import token from "../lib/token/token";

const HomePage = () => {
  const {} = useProfile();
  const navigate = useNavigate();

  useEffect(() => {
    if (token.getToken(ACCESS_TOKEN_KEY) === undefined) {
      navigate("/sign");
    }
  }, [navigate]);

  return (
    <PageTemplate>
      <Home />
    </PageTemplate>
  );
};

export default HomePage;
