import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../../components/Header/Header";
import Loading from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import EventInfo from "../../components/EventInfo/EventInfo";
import PhotoGallery from "../../components/PhotoGallery/PhotoGallery";
import AddPhotoForm from "../../components/AddPhotoForm/AddPhotoForm";

import * as eventsAPI from "../../utils/eventApi";
import * as photosAPI from "../../utils/photoApi";

export default function ViewEventPage({ user, handleLogout }) {
  const { eventTitle } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [event, setEvent] = useState({});
  const [photos, setPhotos] = useState([]);

  async function getEvent() {
    try {
      const data = await eventsAPI.getEvent(eventTitle);
      console.log(data, "<- this is data from getEvent");
      setLoading(false);
      setEvent(data.event);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  }

  async function handleAddPhoto(photo) {
    try {
      setLoading(true);
      const data = await photosAPI.create(photo);
      console.log(data, "<- this is data from handleADdPhoto");
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
      console.log(data, "<- this is data from getPhotos");
      setPhotos(data?.photos);
      setLoading(false);
    } catch (err) {
      console.log(err.message, "<- this is err from getPhotos");
      setError(err.message);
    }
  }

  async function deletePhoto(photoId) {
    console.log(photoId, "this is photoId");
    try {
      const data = await photosAPI.deletePhoto(photoId);
      console.log(data, "this is data from deletePhoto");
    } catch (err) {
      console.log(err, "this is err from deletePhoto");
      setError(err.message);
    }
  }

  useEffect(() => {
    getEvent();
    getPhotos();
  }, []);

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
    <>
      <PageHeader user={user} handleLogout={handleLogout} />
      <h1>This is the View Event Page</h1>;
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
    </>
  );
}
