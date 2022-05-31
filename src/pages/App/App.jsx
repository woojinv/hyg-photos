import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// CSS
import "./App.css";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// Page imports
import LandingPage from "../LandingPage/LandingPage";
import EventsPage from "../EventsPage/EventsPage";
import CreateEventPage from "../CreatePage/CreateEventPage";
import ViewEventPage from "../ViewEventPage/ViewEventPage";
import EditEventPage from "../EditEventPage/EditEventPage";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";

// utility functions
import userService from "../../utils/userService";

function App() {
  const [user, setUser] = useState(userService.getUser());
  const [event, setEvent] = useState({});

  function handleSignUpOrLogin() {
    setUser(userService.getUser()); // getting the user from localstorage decoding the jwt
  }

  function handleLogout() {
    userService.logout();
    setUser(null);
  }

  function editEvent(event) {
    setEvent(event);
  }

  if (user) {
    return (
      <Routes>
        <Route
          path="/"
          element={<LandingPage user={user} handleLogout={handleLogout} />}
        />
        <Route
          path="/events"
          element={<EventsPage user={user} handleLogout={handleLogout} />}
        />
        <Route
          path="/create"
          element={<CreateEventPage user={user} handleLogout={handleLogout} />}
        />
        <Route
          path="/:eventId"
          element={
            <ViewEventPage
              user={user}
              handleLogout={handleLogout}
              editEvent={editEvent}
            />
          }
        />
        <Route
          path="/:eventId/edit"
          element={
            <EditEventPage
              user={user}
              handleLogout={handleLogout}
              event={event}
            />
          }
        />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<LandingPage user={user} handleLogout={handleLogout} />}
      />
      <Route
        path="/events"
        element={<EventsPage user={user} handleLogout={handleLogout} />}
      />
      <Route
        path="/:eventId"
        element={<ViewEventPage user={user} handleLogout={handleLogout} />}
      />
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
