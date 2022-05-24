import { ConfigurationServicePlaceholders } from "aws-sdk/lib/config_service_placeholders";
import React, { useState } from "react";
import { Grid, Form, Segment, Button } from "semantic-ui-react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import PageHeader from "../../components/Header/Header";

import * as eventAPI from "../../utils/eventApi";

export default function EditEventPage({ user, handleLogout, event }) {
  console.log(event, "<- this is event");
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
              <Form.Input
                type="text"
                name="location"
                placeholder={newEvent.location}
                value={newEvent.location}
                onChange={handleChange}
                required
              />
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
