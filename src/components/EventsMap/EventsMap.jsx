import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "../../pages/ViewEventPage/ViewEventPage.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoid29vamludiIsImEiOiJjbDNmMHpka3AwbmVqM2J0bDVoang5b2M0In0.ub8_hkF0ZBD-VENeVLbGlw";

export default function EventsMap({ coordinates, events }) {
  console.log(coordinates, "<- this is coordinates from eventsMap");
  console.log(events, "<- this is events from eventsMAp");
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(Number(coordinates.longitude));
  const [lat, setLat] = useState(Number(coordinates.latitude));
  const [zoom, setZoom] = useState(4);

  async function setMap() {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-93.4807, 41.7895],
      zoom: zoom,
    });
  }

  function getMarkers() {
    console.log(coordinates, "<- this is coordinates from get markers");

    console.log("hittter");

    coordinates.forEach((elem) => {
      console.log(elem, " hello");
      // creater a new marker
      new mapboxgl.Marker()
        .setLngLat([elem.longitude, elem.latitude])
        .addTo(map.current);
    });
  }

  useEffect(() => {
    setMap();
  }, []);

  useEffect(() => {
    console.log("useEffect is running");
    getMarkers();
  }, [coordinates]);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div>
      <div ref={mapContainer} className="map-container">
        <div className="sidebar">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
    </div>
  );
}