import React from "react";
import EventCard from "../EventCard/EventCard";
import { Grid, Image } from "semantic-ui-react";

export default function EventGallery({ events, user, deleteEvent }) {
  return (
    <Grid>
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
    </Grid>
  );
}
