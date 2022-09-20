import { pageView } from "../lib/ga/gtag";
import { useEffect } from "react";
import { Route, Routes as Switch, useLocation } from "react-router-dom";
import AuthPage from "../pages/authPage";
import HomePage from "../pages/homePage";

const Routes = () => {
  const location = useLocation();

  useEffect(() => {
    pageView();
  }, [location]);

  return (
    <Switch>
      <Route path="/" element={<HomePage />} />
      <Route path="/sign" element={<AuthPage />} />
    </Switch>
  );
};

export default Routes;
