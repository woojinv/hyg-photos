import React from "react";
import PageHeader from "../../components/Header/Header";

export default function EditEventPage({ user, handleLogout }) {
  return (
    <>
      <PageHeader user={user} handleLogout={handleLogout} />
    </>
  );
}
