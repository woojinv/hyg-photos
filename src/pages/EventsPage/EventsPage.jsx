import React, { useState, useEffect } from "react";
import PageHeader from "../../components/Header/Header";
import { Grid } from "semantic-ui-react";
import * as eventsAPI from "../../utils/eventApi";

export default function EventsPage({ user, handleLogout }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function getEvents() {
    try {
      const data = await eventsAPI.getAll();
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
          <h1>This is the Events Page</h1>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
