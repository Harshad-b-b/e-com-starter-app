import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./landingpage/LandingPage";
import Login from "./loginpage/Login";
import Registration from "./registrationpage/Registration";
import CrudPage from "./crudpage/CrudPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/registration" element={<Registration />} />
      <Route element={<ProtectedRoute />}>
        <Route exact path="/crudpage" element={<CrudPage />} />
      </Route>
    </Routes>
  );
}

export default App;
