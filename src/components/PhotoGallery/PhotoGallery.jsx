import React from "react";
import PhotoCard from "../PhotoCard/PhotoCard";

export default function PhotoGallery({ photos, user, deletePhoto }) {
  return (
    <>
      <h1>This is the PhotoGallery Component</h1>
      {photos.map((photo, i) => {
        return (
          <PhotoCard
            photo={photo}
            key={i}
            user={user}
            deletePhoto={deletePhoto}
          />
        );
      })}
    </>
  );
}
