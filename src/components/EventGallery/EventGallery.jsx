import React from "react";
import EventCard from "../EventCard/EventCard";

export default function EventGallery({ events }) {
  return (
    <div className="EventGallery">
      <h1>This is the Event Gallery</h1>
      {events.map((event) => {
        return <EventCard event={event} key={event._id} />;
      })}
    </div>
  );
}
