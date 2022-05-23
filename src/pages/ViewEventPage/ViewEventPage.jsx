import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../../components/Header/Header";
import Loading from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import EventInfo from "../../components/EventInfo/EventInfo";
import PhotoGallery from "../../components/PhotoGallery/PhotoGallery";

import * as eventsAPI from "../../utils/eventApi";

export default function ViewEventPage({ user, handleLogout }) {
  const { eventTitle } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [event, setEvent] = useState({});

  async function getEvent() {
    try {
      const data = await eventsAPI.getEvent(eventTitle);
      console.log(data, "<- this is data from getEvent");
      setLoading(false);
      setEvent(data.event);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  }

  useEffect(() => {
    getEvent();
  }, []);

  if (error) {
    return (
      <>
        <PageHeader user={user} handleLogout={handleLogout} />
        <ErrorMessage error={error} />
      </>
    );
  }

  if (loading) {
    return (
      <>
        <PageHeader user={user} handleLogout={handleLogout} />
        <Loading />
      </>
    );
  }

  return (
    <>
      <PageHeader user={user} handleLogout={handleLogout} />
      <h1>This is the View Event Page</h1>;
      <EventInfo
        title={event?.title}
        description={event.description}
        location={event.location}
        date={event.date}
        photoUrl={event.photoUrl}
        id={event._id}
      />
      <PhotoGallery />
    </>
  );
}
