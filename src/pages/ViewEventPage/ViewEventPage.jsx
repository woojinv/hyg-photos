import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Map from "../../components/Map/Map";
import PageHeader from "../../components/Header/Header";
import Loading from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import EventInfo from "../../components/EventInfo/EventInfo";
import PhotoGallery from "../../components/PhotoGallery/PhotoGallery";
import AddPhotoForm from "../../components/AddPhotoForm/AddPhotoForm";

import * as eventsAPI from "../../utils/eventApi";
import * as photosAPI from "../../utils/photoApi";

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
  const { eventTitle } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [event, setEvent] = useState({});
  const [photos, setPhotos] = useState([]);

  async function getEvent() {
    try {
      setLoading(true);
      const data = await eventsAPI.getEvent(eventTitle);

      setEvent(data?.event);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  }

  async function handleAddPhoto(photo) {
    try {
      setLoading(true);
      const data = await photosAPI.create(photo);

      setLoading(false);
      getPhotos();
    } catch (err) {
      console.log(err, "<- this is err from handleAddPhoto");
      setError(err.message);
    }
  }

  async function getPhotos() {
    try {
      setLoading(true);
      const data = await photosAPI.getAll(eventTitle);

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
      <Container>
        <Row>
          <Col>
            <PageHeader user={user} handleLogout={handleLogout} />
          </Col>
        </Row>
        <Row>
          <Col
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1 style={{ display: "inline" }}>{event.title}</h1>

            {user._id === event?.user ? (
              <Link to={`/${event?.title}/edit`}>
                <Button onClick={handleClick}>Edit</Button>
              </Link>
            ) : null}
          </Col>
        </Row>
        <Row>
          <Col>
            {coordinates.latitude ? <Map coordinates={coordinates} /> : null}
          </Col>
        </Row>

        <EventInfo
          title={event?.title}
          description={event.description}
          location={event.location}
          date={event.date}
          photoUrl={event.photoUrl}
          id={event._id}
        />
        <AddPhotoForm handleAddPhoto={handleAddPhoto} title={event?.title} />
        <PhotoGallery photos={photos} user={user} deletePhoto={deletePhoto} />
      </Container>
    );
  }

  return (
    <>
      <PageHeader user={user} handleLogout={handleLogout} />
      <h1>This is the View Event Page</h1>
      {coordinates.latitude ? <Map coordinates={coordinates} /> : null}

      <EventInfo
        title={event?.title}
        description={event.description}
        location={event.location}
        date={event.date}
        photoUrl={event.photoUrl}
        id={event._id}
      />

      <PhotoGallery photos={photos} user={user} deletePhoto={deletePhoto} />
    </>
  );
}
