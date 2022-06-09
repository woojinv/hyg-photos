import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// framer-motion
import { motion } from "framer-motion";

// Components
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import PageHeader from "../../components/Header/Header";
import Loading from "../../components/Loader/Loader";

// Semantic UI
import { Grid, Form, Segment, Button, Header } from "semantic-ui-react";

// Places API
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";

// utility functions
import * as eventAPI from "../../utils/eventApi";

export default function EditEventPage({ user, handleLogout, event }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newEvent, setNewEvent] = useState({
    title: event.title,
    description: event.description,
    location: event.location,
    date: event.date,
    _id: event._id,
  });

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      const data = await eventAPI.editEvent(newEvent);
      setNewEvent(data.event);
      setLoading(false);
      navigate(`/${data.event._id}`);
    } catch (err) {
      console.log(
        err.message,
        "<-- this is err from handleSubmit on EditEventPage"
      );
      setError(err.message);
    }
  }

  function handleChange(e) {
    setNewEvent({
      ...newEvent,
      [e.target.name]: e.target.value,
    });
    const inputField = e.target.attributes[0].value;

    if (inputField === "location") {
      handleInput(e);
    }
  }

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* define search scope here */
    },
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
    console.log(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      setNewEvent({
        ...newEvent,
        location: description,
      });
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        try {
          const { lat, lng } = getLatLng(results[0]);

          console.log("📍 Coordinates: ", { lat, lng });
        } catch (error) {
          console.log("😱 Error: ", error);
        }
      });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  // if user refreshes page while editing event, redirect to all events
  if (!event.title) {
    navigate("/events");
  }

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
    <Grid centered style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Link to="/">
            <img
              style={{ width: "75px" }}
              src="https://storage.snappages.site/3FFMJ4/assets/images/676092_311x310_500.png"
            />
          </Link>{" "}
          Edit this Event
        </Header>{" "}
        <Form
          style={{ maxWidth: 450 }}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Segment stacked>
            <Form.Input
              type="text"
              name="title"
              label="Title"
              placeholder={newEvent.title}
              value={newEvent.title}
              onChange={handleChange}
              required
            />
            <Form.TextArea
              type="text"
              name="description"
              label="Description"
              placeholder={newEvent.description}
              value={newEvent.description}
              onChange={handleChange}
              required
            />
            <Form.Field>
              <div ref={ref}>
                <label>
                  <strong>Location</strong>
                </label>
                <input
                  name="location"
                  value={value}
                  onChange={handleChange}
                  disabled={!ready}
                  placeholder={newEvent.location}
                />
                {/* We can use the "status" to decide whether we should display the dropdown or not */}
                {status === "OK" && <ul>{renderSuggestions()}</ul>}
              </div>
            </Form.Field>
            <Form.Input
              type="date"
              name="date"
              label="Date"
              placeholder={newEvent.date}
              value={newEvent.date}
              onChange={handleChange}
              required
            />
            <Button
              color="teal"
              fluid
              size="large"
              type="submit"
              className="btn"
            >
              Submit
            </Button>
          </Segment>
          {error ? <ErrorMessage error={error} /> : null}
        </Form>
      </Grid.Column>
    </Grid>
  );
}
