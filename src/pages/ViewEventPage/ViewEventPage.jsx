import React from "react";
import Header from "../../components/Header/Header";
import EventInfo from "../../components/EventInfo/EventInfo";
import PhotoGallery from "../../components/PhotoGallery/PhotoGallery";
import PhotoCard from "../../components/PhotoCard/PhotoCard";

export default function ViewEventPage({ user, handleLogout }) {
  return (
    <>
      <Header user={user} handleLogout={handleLogout} />
      <h1>This is the View Event Page</h1>;
      <EventInfo />
      <PhotoGallery></PhotoGallery>
      <PhotoCard />
    </>
  );
}
