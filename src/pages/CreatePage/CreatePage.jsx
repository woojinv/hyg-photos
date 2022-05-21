import React from "react";
import PageHeader from "../../components/Header/Header";
import { Grid } from "semantic-ui-react";

export default function CreatePage({ user, handleLogout }) {
  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <PageHeader user={user} handleLogout={handleLogout} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
