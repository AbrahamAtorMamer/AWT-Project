import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import CreateCampaign from './pages/Campaign/CreateCampaign';
import RegistrationPage from "./pages/SignupPage/RegistrationPage";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import PaymentSuccess from "./pages/Dashboard/PaymentSuccess"

const App = () => {

  return (
    <Router>
      <Fragment>
        {/* {isAuthenticated && <NavBarHook />} Render NavBarHook only if authenticated */}
        {/* <NavBar />  */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/paymentsuccess" element={<PaymentSuccess />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route exact element={<PrivateRoute />}>
            <Route path="/create-campaign" element={<CreateCampaign />} />
          </Route>
          <Route exact element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard/>} />
          </Route>
        </Routes>
      </Fragment>
    </Router>
  );
};

export default App;

