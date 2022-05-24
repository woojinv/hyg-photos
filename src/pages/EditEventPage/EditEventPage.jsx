import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Grid, Form, Segment, Button } from "semantic-ui-react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import PageHeader from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";

import * as eventAPI from "../../utils/eventApi";

export default function EditEventPage({ user, handleLogout, event }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [newEvent, setNewEvent] = useState({
    previousTitle: event.title,
    title: event.title,
    description: event.description,
    location: event.location,
    date: event.date,
  });

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const data = await eventAPI.editEvent(newEvent);
      console.log(data, "<- this is data from handleSubmit in EditEventPage");
      setNewEvent(data.event);
      navigate(`/${data.event.title}`);
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

  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <PageHeader user={user} handleLogout={handleLogout} />
          <Form
            style={{ maxWidth: 450 }}
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <Segment stacked>
              <Form.Input
                type="text"
                name="title"
                placeholder={newEvent.title}
                value={newEvent.title}
                onChange={handleChange}
                required
              />
              <Form.Input
                type="text"
                name="description"
                placeholder={newEvent.description}
                value={newEvent.description}
                onChange={handleChange}
                required
              />
              <Form.Field>
                <div ref={ref}>
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
                type="text"
                name="date"
                placeholder={newEvent.date}
                value={newEvent.date}
                onChange={handleChange}
                required
              />
              <Button type="submit" className="btn">
                Submit
              </Button>
            </Segment>
            {error ? <ErrorMessage error={error} /> : null}
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
