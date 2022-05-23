import React from "react";
import EventCard from "../EventCard/EventCard";

export default function EventGallery({ events, user, deleteEvent }) {
  return (
    <div className="EventGallery">
      <h1>This is the Event Gallery</h1>
      {events.map((event, i) => {
        return (
          <EventCard
            event={event}
            key={i}
            user={user}
            deleteEvent={deleteEvent}
          />
        );
      })}
    </div>
  );
}
