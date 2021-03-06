import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

// framer-motion
import { motion } from "framer-motion";

// Components
import Map from "../../components/Map/Map";
import PageHeader from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Loading from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import EventInfo from "../../components/EventInfo/EventInfo";
import PhotoGallery from "../../components/PhotoGallery/PhotoGallery";
import AddPhotoForm from "../../components/AddPhotoForm/AddPhotoForm";

// utility functions
import * as eventsAPI from "../../utils/eventApi";
import * as photosAPI from "../../utils/photoApi";

// places API
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default function ViewEventPage({ user, handleLogout, editEvent }) {
  const { eventId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [event, setEvent] = useState({});
  const [photos, setPhotos] = useState([]);

  async function getEvent() {
    try {
      setLoading(true);
      const data = await eventsAPI.getEvent(eventId);

      setEvent(data?.event);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  }

  async function handleAddPhoto(photos) {
    try {
      setLoading(true);
      const data = await photosAPI.create(photos);
      getPhotos();
    } catch (err) {
      console.log(err, "<- this is err from handleAddPhoto");
      setError(err.message);
    }
  }

  async function getPhotos() {
    try {
      setLoading(true);
      const data = await photosAPI.getAll(eventId);

      setPhotos(data?.photos);
      setLoading(false);
    } catch (err) {
      console.log(err.message, "<- this is err from getPhotos");
      setError(err.message);
    }
  }

  async function deletePhoto(photoId) {
    try {
      const data = await photosAPI.deletePhoto(photoId);

      getPhotos();
    } catch (err) {
      console.log(err, "this is err from deletePhoto");
      setError(err.message);
    }
  }

  function handleClick() {
    editEvent(event);
  }

  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  });

  async function getCoordinates() {
    const parameter = { address: event?.location };

    try {
      const res = await getGeocode(parameter);
      const { lat, lng } = getLatLng(res[0]);
      setCoordinates({ latitude: lat, longitude: lng });
    } catch (err) {
      console.log(err, "<- this is err from getCoordiantes");
    }
  }

  useEffect(() => {
    getEvent();
    getPhotos();
  }, []);

  useEffect(() => {
    if (event.location) {
      getCoordinates();
    }
  }, [event]);

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

  if (user) {
    return (
      <Container className="shadow-5-strong">
        <Row>
          <Col>
            <PageHeader user={user} handleLogout={handleLogout} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <motion.h1
              style={{ display: "inline" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: "easeInOut", duration: 1 }}
            >
              {event.title}
            </motion.h1>

            {user._id === event?.user || user.username === "superuser" ? (
              <Link to={`/${event?._id}/edit`}>
                <motion.div
                  style={{ display: "inline" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ ease: "easeInOut", duration: 1 }}
                >
                  <Button size="lg" onClick={handleClick}>
                    Edit
                  </Button>
                </motion.div>
              </Link>
            ) : null}
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <motion.h3
              style={{ display: "inline" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, ease: "easeInOut", duration: 1 }}
            >
              {event.location}
            </motion.h3>
          </Col>
        </Row>

        <Row style={{ marginTop: ".5rem" }}>
          <Col>
            <motion.div
              style={{ display: "inline" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, ease: "easeInOut", duration: 1 }}
            >
              {coordinates.latitude ? <Map coordinates={coordinates} /> : null}
            </motion.div>
          </Col>
        </Row>

        <Row>
          <Col>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, ease: "easeInOut", duration: 1 }}
            >
              <EventInfo
                title={event?.title}
                description={event.description}
                location={event.location}
                date={event.date}
                photoUrl={event.photoUrl}
                id={event._id}
              />
            </motion.div>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, ease: "easeInOut", duration: 1 }}
            >
              <h2>Add a Photo to this Event!</h2>
              <AddPhotoForm
                handleAddPhoto={handleAddPhoto}
                eventId={event?._id}
              />
            </motion.div>
          </Col>
        </Row>
        <br />
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, ease: "easeInOut", duration: 1 }}
        >
          Photo Gallery
        </motion.h2>
        <br />
        <Row>
          <Col>
            <PhotoGallery
              photos={photos}
              user={user}
              deletePhoto={deletePhoto}
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

  return (
    <Container className="shadow-5-strong">
      <Row>
        <Col>
          <PageHeader user={user} handleLogout={handleLogout} />
        </Col>
      </Row>
      <br />
      <Row>
        <Col style={{ textAlign: "center" }}>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 1 }}
          >
            {event.title}
          </motion.h1>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, ease: "easeInOut", duration: 1 }}
          >
            {event.location}
          </motion.h3>
        </Col>
      </Row>
      <Row style={{ marginTop: ".5rem" }}>
        <Col>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, ease: "easeInOut", duration: 1 }}
          >
            {coordinates.latitude ? <Map coordinates={coordinates} /> : null}
          </motion.div>
        </Col>
      </Row>

      <Row>
        <Col>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, ease: "easeInOut", duration: 1 }}
          >
            <EventInfo
              title={event?.title}
              description={event.description}
              location={event.location}
              date={event.date}
              photoUrl={event.photoUrl}
              id={event._id}
            />
          </motion.div>
        </Col>
      </Row>
      <br />
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, ease: "easeInOut", duration: 1 }}
      >
        Photo Gallery
      </motion.h2>
      <br />
      <Row>
        <Col>
          <PhotoGallery photos={photos} user={user} deletePhoto={deletePhoto} />
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
