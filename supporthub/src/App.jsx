import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBarHook from "./components/NavBarHook/NavBarHook";
import HomePage from "./components/pages/Home/HomePage";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import RegistrationForm from './components/Auth/Signup/RegistrationForm';
import CreateCampaign from './components/Campaign/CreateCampaign';
import LoginForm from './components/Auth/Login/LoginForm';
import RegistrationPage from "./components/pages/SignupPage/RegistrationPage";
//import BasicContent from "./components/Campaign/BasicContent";
import PrivateRoute from "./PrivateRoute";
import SideBar from "./components/SideBar/SideBar";
import NavBar from "./components/NavBar/NavBar";

const App = () => {
  
  return (
    <Router>
      <div>
        <NavBar /> 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

