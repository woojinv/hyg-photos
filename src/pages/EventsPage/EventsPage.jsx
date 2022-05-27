import React, { useState, useEffect } from "react";

// Components
import PageHeader from "../../components/Header/Header";
import Loading from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import EventsMap from "../../components/EventsMap/EventsMap";
import EventGallery from "../../components/EventGallery/EventGallery";
import Footer from "../../components/Footer/Footer";

// Places API
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

// React Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// utility functions
import * as eventsAPI from "../../utils/eventApi";

export default function EventsPage({ user, handleLogout }) {
  const [events, setEvents] = useState([]);

  const [coordinates, setCoordinates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // fav function 1
  async function getCoordinates() {
    const coordinatesArray = [];
    const promises = events.map((event) => {
      const parameter = { address: event.location };
      const res = getGeocode(parameter);
      return res;
    });
    try {
      const fulfilled = await Promise.all(promises);
      fulfilled.forEach((res) => {
        const { lat, lng } = getLatLng(res[0]);
        coordinatesArray.push({ latitude: lat, longitude: lng });
      });
      setCoordinates(coordinatesArray);
    } catch (err) {
      console.log(err, "<- this is err from getCoordinates");
    }
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
    <Container fluid className="shadow-5-strong">
      <Row>
        <Col>
          <PageHeader user={user} handleLogout={handleLogout} />
        </Col>
      </Row>
      <Row>
        <Col>
          <EventsMap coordinates={coordinates} events={events} />
        </Col>
      </Row>

      <Row>
        <Col>
          <EventGallery events={events} user={user} deleteEvent={deleteEvent} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Footer />
        </Col>
      </Row>
    </Container>
  );
}
