import React, { useState } from "react";
import { Card, Image, Icon } from "semantic-ui-react";

import * as photosApi from "../../utils/photoApi";

export default function PhotoCard({ photo, user }) {
  const [error, setError] = useState("");
  console.log(photo);
  async function deletePhoto(e) {
    try {
      const photoId = e.target.attributes[0].value;
      const userId = e.target.attributes[1].value;
      console.log(photoId, "<- this is photoId");
      console.log(userId, "<- this is userId");

      const data = await photosApi.deletePhoto(photoId);
      console.log(data, "this is data from deletePhoto");
    } catch (err) {
      console.log(err, "this is err from deletePhoto");
      setError(err.message);
    }
  }

  if (user) {
    return (
      <Card>
        <Image src={photo.photoUrl} />

        {photo.user === user._id ? (
          <Icon
            name="delete"
            onClick={deletePhoto}
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
