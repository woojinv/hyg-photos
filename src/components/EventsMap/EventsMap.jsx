import React, { useRef, useEffect, useState } from "react";

// Mapbox
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "../../pages/ViewEventPage/ViewEventPage.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoid29vamludiIsImEiOiJjbDNmMHpka3AwbmVqM2J0bDVoang5b2M0In0.ub8_hkF0ZBD-VENeVLbGlw";

export default function EventsMap({ coordinates, events }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(Number(coordinates.longitude));
  const [lat, setLat] = useState(Number(coordinates.latitude));
  const [zoom, setZoom] = useState(6.53);

  async function setMap() {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v10",
      center: [-88.6073, 42.0117],
      zoom: zoom,
    });
  }

  // fav function 2
  function getMarkers() {
    coordinates.forEach((elem) => {
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
    <div ref={mapContainer} className="map-container shadow-2-strong">
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
    </div>
  );
}
