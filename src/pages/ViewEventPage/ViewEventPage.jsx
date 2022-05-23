import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import EventInfo from "../../components/EventInfo/EventInfo";
import PhotoGallery from "../../components/PhotoGallery/PhotoGallery";

import * as eventsAPI from "../../utils/eventApi";

export default function ViewEventPage({ user, handleLogout }) {
  const { title } = useParams();
  async function getEvent() {
    console.log("getEvent hit");
    const data = await eventsAPI.getEvent(title);
  }

  useEffect(() => {
    getEvent();
  }, []);

  return (
    <>
      <Header user={user} handleLogout={handleLogout} />
      <h1>This is the View Event Page</h1>;
      <EventInfo />
      <PhotoGallery />
    </>
  );
}
