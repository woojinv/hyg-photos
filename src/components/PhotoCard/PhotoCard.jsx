import React, { useState } from "react";
import { Card, Image, Icon } from "semantic-ui-react";

export default function PhotoCard({ photo, user, deletePhoto }) {
  console.log(photo);
  function handleClick(e) {
    const photoId = e.target.attributes[0].value;
    deletePhoto(photoId);
  }

  if (user) {
    return (
      <Card>
        <Image src={photo.photoUrl} />

        {photo.user === user._id ? (
          <Icon
            name="delete"
            onClick={handleClick}
            photoid={photo._id}
            userid={user._id}
          />
        ) : null}
      </Card>
    );
  }

  return (
    <Card>
      <Image src={photo.photoUrl} />
    </Card>
  );
}
