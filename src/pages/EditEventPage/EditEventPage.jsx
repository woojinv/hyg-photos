import React, { useState } from "react";
import PageHeader from "../../components/Header/Header";

export default function EditEventPage({ user, handleLogout, event }) {
  console.log(event, "<- this is event");
  const [newEvent, setNewEvent] = useState({
    title: event.title,
    description: event.description,
    location: event.location,
    date: event.date,
  });

  return (
    <>
      <PageHeader user={user} handleLogout={handleLogout} />
    </>
  );
}
