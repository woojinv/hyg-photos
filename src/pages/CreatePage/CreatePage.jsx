import React, { useState } from "react";
import PageHeader from "../../components/Header/Header";
import { Grid } from "semantic-ui-react";
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

  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <PageHeader user={user} handleLogout={handleLogout} />
          <h1>This is the Create Event Page</h1>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
