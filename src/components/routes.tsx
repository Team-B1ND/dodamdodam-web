import { Route, Routes as Switch } from "react-router-dom";
import AuthPage from "../pages/authPage";
import HomePage from "../pages/homePage";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" element={<HomePage />} />
      <Route path="/sign" element={<AuthPage />} />
    </Switch>
  );
};

export default Routes;
