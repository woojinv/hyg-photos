import React, { useState, useEffect } from "react";
import PageHeader from "../../components/Header/Header";
import EventGallery from "../../components/EventGallery/EventGallery";
import { Grid } from "semantic-ui-react";
import * as eventsAPI from "../../utils/eventApi";

export default function EventsPage({ user, handleLogout }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function getEvents() {
    try {
      const data = await eventsAPI.getAll();
      console.log(data, "<- this is data from getEvents");
      setEvents(data.events);
      console.log(events);
    } catch (err) {
      console.log(err.message, "<- this is error from getEvents");
      setError(err.message);
    }
  }

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <PageHeader user={user} handleLogout={handleLogout} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <h1>This is the Events Page</h1>
          <EventGallery events={events} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
