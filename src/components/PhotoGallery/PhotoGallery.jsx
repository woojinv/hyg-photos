import React from "react";
import PhotoCard from "../PhotoCard/PhotoCard";

export default function PhotoGallery({ photos }) {
  return (
    <>
      <h1>This is the PhotoGallery Component</h1>
      {photos.map((photo, i) => {
        return <PhotoCard photo={photo} key={i} />;
      })}
    </>
  );
}
