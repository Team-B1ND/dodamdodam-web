import PersonalInformationPage from "@src/pages/PersonalInformationPage";
import ServicePolicyPage from "@src/pages/ServicePolicyPage";
import { Route, Routes as Switch } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import HomePage from "../pages/HomePage";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" element={<HomePage />} />
      <Route path="/sign" element={<AuthPage />} />
      <Route
        path="/detailed-information/personal-information"
        element={<PersonalInformationPage />}
      />
      <Route
        path="/detailed-information/service-policy"
        element={<ServicePolicyPage />}
      />
    </Switch>
  );
};

export default Routes;
