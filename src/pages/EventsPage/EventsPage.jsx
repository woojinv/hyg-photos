import React, { useState, useEffect } from "react";
import PageHeader from "../../components/Header/Header";
import Loading from "../../components/Loader/Loader";
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
      setLoading(false);
    } catch (err) {
      console.log(err.message, "<- this is error from getEvents");
      setError(err.message);
    }
  }

  async function deleteEvent() {
    console.log("deleteEvents hit in Eventspage");
  }

  useEffect(() => {
    getEvents();
  }, []);

  if (loading) {
    return (
      <>
        <PageHeader user={user} handleLogout={handleLogout} />
        <Loading />
      </>
    );
  }

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
          <EventGallery events={events} user={user} deleteEvent={deleteEvent} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
