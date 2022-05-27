import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// Components
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import PageHeader from "../../components/Header/Header";
import Loading from "../../components/Loader/Loader";

// Semantic UI
import { Button, Form, Grid, Segment, Header } from "semantic-ui-react";

// places API
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";

// Utlity functions
import * as eventsAPI from "../../utils/eventApi";

export default function CreatePage({ user, handleLogout, handleSubmit }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      const data = await eventsAPI.create(formData);
      console.log(data, "<- this is data from handleSubmit in CreateEventpage");
      setLoading(false);
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
    const inputField = e.target.attributes[0].value;

    if (inputField === "location") {
      handleInput(e);
    }
  }

  function handleFileInput(e) {
    setSelectedFile(e.target.files[0]);
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
      setState({
        ...state,
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
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Link to="/">
            <img
              style={{ width: "75px" }}
              src="https://storage.snappages.site/3FFMJ4/assets/images/676092_311x310_500.png"
            />
          </Link>{" "}
          Create an Event
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

            <Form.Field>
              <div ref={ref}>
                <input
                  name="location"
                  value={value}
                  onChange={handleChange}
                  disabled={!ready}
                  placeholder="Where did this event take place?"
                />
                {/* We can use the "status" to decide whether we should display the dropdown or not */}
                {status === "OK" && <ul>{renderSuggestions()}</ul>}
              </div>
            </Form.Field>
            <Form.Input
              type="date"
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
    </Grid>
  );
}
