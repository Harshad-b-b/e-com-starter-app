import { Outlet } from "react-router";
import LandingPage from "../landingpage/LandingPage";
const useAuth = () => {
  const token = localStorage.getItem("token");
  return token ? true : false;
};
export default function ProtectedRoute() {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <LandingPage />;
}
