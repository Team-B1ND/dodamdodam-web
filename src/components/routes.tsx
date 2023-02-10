import { Route, Routes as Switch } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import HomePage from "../pages/HomePage";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" element={<HomePage />} />
      <Route path="/sign" element={<AuthPage />} />
    </Switch>
  );
};

export default Routes;
