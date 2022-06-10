import React, { useState, useEffect } from "react";

// framer-motion
import { motion } from "framer-motion";

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
import Form from "react-bootstrap/Form";

// utility functions
import * as eventsAPI from "../../utils/eventApi";
import { FormControl } from "react-bootstrap";

export default function EventsPage({ user, handleLogout }) {
  const [searchInput, setSearchInput] = useState("");
  const [events, setEvents] = useState([]);
  const [displayedEvents, setDisplayedEvents] = useState([]);

  const [coordinates, setCoordinates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // SEARCH FUNCTIONALITY
  function handleChange(e) {
    setSearchInput(e.target.value.toLowerCase());
  }

  function getSearchedEvents() {
    const filteredEvents = events.filter((event) => {
      return event.title.toLowerCase().includes(searchInput);
    });
    setDisplayedEvents(filteredEvents);
  }

  useEffect(() => {
    getSearchedEvents();
  }, [searchInput]);

  function handleSubmit(e) {
    e.preventDefault();
  }

  // ***********************

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
    setDisplayedEvents(events);
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 1 }}
          >
            <EventsMap coordinates={coordinates} events={events} />
          </motion.div>
        </Col>
      </Row>
      <br />
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, ease: "easeInOut", duration: 1 }}
      >
        Hebron Youth Group Events Gallery
      </motion.h1>
      <br />
      <Row>
        <Col>
          <Form style={{ maxWidth: 450 }} onSubmit={handleSubmit}>
            <Form.Group>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, ease: "easeInOut", duration: 1 }}
              >
                <FormControl
                  type="search"
                  placeholder="Search for an Event!"
                  className="me-2"
                  aria-label="Search"
                  onChange={handleChange}
                />
              </motion.div>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <EventGallery
            events={displayedEvents}
            user={user}
            deleteEvent={deleteEvent}
          />
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
