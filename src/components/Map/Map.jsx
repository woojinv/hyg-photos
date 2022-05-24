import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "../../pages/ViewEventPage/ViewEventPage.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoid29vamludiIsImEiOiJjbDNmMHpka3AwbmVqM2J0bDVoang5b2M0In0.ub8_hkF0ZBD-VENeVLbGlw";

export default function Map({ coordinates }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(Number(coordinates.longitude));
  const [lat, setLat] = useState(Number(coordinates.latitude));
  const [zoom, setZoom] = useState(9);

  console.log(coordinates, "<- this is coordinates from Map");

  //   async function setCoordinates() {
  //     setLng(Number(coordinates?.longitude));
  //     setLat(Number(coordinates?.latitude));
  //   }

  async function setMap() {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  }

  useEffect(() => {
    // setCoordinates();
    setMap();
  }, []);

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
