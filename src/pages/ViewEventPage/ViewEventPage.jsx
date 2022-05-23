import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import EventInfo from "../../components/EventInfo/EventInfo";
import PhotoGallery from "../../components/PhotoGallery/PhotoGallery";

import * as eventsAPI from "../../utils/eventApi";

export default function ViewEventPage({ user, handleLogout }) {
  const { event } = useParams();
  async function getEvent() {
    console.log("getEvent hit");
    console.log(event, "<- this is ttile from getEvent in ViewEventpage");
    const data = await eventsAPI.getEvent(event);
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
