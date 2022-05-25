import React, { useState, useEffect } from "react";
import PageHeader from "../../components/Header/Header";
import Loading from "../../components/Loader/Loader";
import EventsMap from "../../components/EventsMap/EventsMap";
import EventGallery from "../../components/EventGallery/EventGallery";
import { Grid } from "semantic-ui-react";
import * as eventsAPI from "../../utils/eventApi";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

export default function EventsPage({ user, handleLogout }) {
  const [events, setEvents] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function getCoordinates() {
    const coordinatesArray = [];
    events.map(async (event) => {
      const parameter = { address: event.location };
      try {
        const res = await getGeocode(parameter);
        const { lat, lng } = getLatLng(res[0]);
        coordinatesArray.push({ latitude: lat, longitude: lng });
      } catch (err) {
        console.log(err, "<- this is err from getCoordinates in EventsPage");
      }
    });
    setCoordinates(coordinatesArray);
  }

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

  async function deleteEvent(eventId) {
    try {
      const data = await eventsAPI.deleteEvent(eventId);
      console.log(data, "<- this is data from deleteEvent");
      getEvents();
    } catch (err) {
      console.log(err.message, "<- this is err from eventId");
      setError(err.message);
    }
  }

  // testing purposes

  useEffect(() => {
    getEvents();
  }, []);

  useEffect(() => {
    getCoordinates();
  }, [events]);

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
          <EventsMap coordinates={coordinates} events={events} />
          <h1>This is the Events Page</h1>
          <EventGallery events={events} user={user} deleteEvent={deleteEvent} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
