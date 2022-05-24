import React from "react";
import PageHeader from "../../components/Header/Header";

export default function EditEventPage({ user, handleLogout, event }) {
  console.log(event, "<- this is event");
  return (
    <>
      <PageHeader user={user} handleLogout={handleLogout} />
    </>
  );
}
