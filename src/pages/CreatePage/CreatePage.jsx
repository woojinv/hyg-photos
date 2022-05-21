import React, { useState } from "react";
import PageHeader from "../../components/Header/Header";
import { Form, Grid, Segment } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

export default function CreatePage({ user, handleLogout }) {
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
    console.log("handleSubmit function hit");

    // will need to adjust for form data

    try {
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
                placeholder="title"
                value={state.title}
                onChange={handleChange}
                required
              />
              <Form.TextArea
                label="description"
                name="description"
                placeholder="add a description about this event"
                onChange={handleChange}
              />
            </Segment>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
