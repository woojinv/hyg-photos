import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "../LandingPage/LandingPage";
import EventsPage from "../EventsPage/EventsPage";
import CreateEventPage from "../CreatePage/CreateEventPage";
import ViewEventPage from "../ViewEventPage/ViewEventPage";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import userService from "../../utils/userService";

function App() {
  const [user, setUser] = useState(userService.getUser()); // getUser decodes our JWT token, into a javascript object
  // this object corresponds to the jwt payload which is defined in the server signup or login function that looks like
  // this  const token = createJWT(user); // where user was the document we created from mongo

  function handleSignUpOrLogin() {
    setUser(userService.getUser()); // getting the user from localstorage decoding the jwt
    console.log(user, "<- this is user");
  }

  function handleLogout() {
    userService.logout();
    setUser(null);
  }

  if (user) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/events"
          element={<EventsPage user={user} handleLogout={handleLogout} />}
        />
        <Route
          path="/create"
          element={<CreateEventPage user={user} handleLogout={handleLogout} />}
        />
        <Route path="/:event" element={<ViewEventPage />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/events"
        element={<EventsPage user={user} handleLogout={handleLogout} />}
      />
      <Route path="/:event" element={<ViewEventPage />} />
      <Route
        path="/login"
        element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route
        path="/signup"
        element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
