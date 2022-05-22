import React from "react";
import EventCard from "../EventCard/EventCard";

export default function EventGallery({ events }) {
  return (
    <div className="EventGallery">
      <h1>This is the Event Gallery</h1>
      {events.map((event, i) => {
        return <EventCard event={event} key={i} />;
      })}
    </div>
  );
}
