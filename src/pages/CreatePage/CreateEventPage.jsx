import React, { useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import PageHeader from "../../components/Header/Header";
import { Button, Form, Grid, Segment } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

import PlacesAutocomplete from "../../components/PlacesAutocomplete/PlacesAutocomplete";

import * as eventsAPI from "../../utils/eventApi";

export default function CreatePage({ user, handleLogout, handleSubmit }) {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [state, setState] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
  });

  const [selectedFile, setSelectedFile] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("photo", selectedFile);
    for (let fieldName in state) {
      formData.append(fieldName, state[fieldName]);
    }

    try {
      const data = await eventsAPI.create(formData);
      console.log(data, "<- this is data from handleSubmit in CreateEventpage");
      navigate("/events");
    } catch (err) {
      setError(err.message);
      console.log(err.message, "<- this is error message from handleSubmit");
    }
  }

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  function handleFileInput(e) {
    console.log(e.target.files);
    setSelectedFile(e.target.files[0]);
  }

  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <PageHeader user={user} handleLogout={handleLogout} />
          <h1>This is the Create Event Page</h1>
          <Form
            style={{ maxWidth: 450 }}
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <Segment stacked>
              <Form.Input
                type="text"
                name="title"
                placeholder="Title"
                value={state.title}
                onChange={handleChange}
                required
              />
              <Form.TextArea
                label="Description"
                name="description"
                placeholder="Add a brief description of your event or details others may find useful"
                onChange={handleChange}
              />
              {/* <Form.Input
                type="text"
                name="location"
                placeholder="Location"
                value={state.location}
                onChange={handleChange}
                required
              /> */}
              <Form.Field>
                <PlacesAutocomplete />
              </Form.Field>
              <Form.Input
                type="text"
                name="date"
                placeholder="Date"
                value={state.date}
                onChange={handleChange}
                required
              />
              <Form.Field>
                <Form.Input
                  type="file"
                  name="photo"
                  placeholder="upload a coverphoto"
                  onChange={handleFileInput}
                />
              </Form.Field>
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
