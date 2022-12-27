import React, { useState } from "react";
export default function useTrackLocation() {
  const [locationErrorMessage, setLocationErrorMessage] = useState("");
  const [latLong, setLatLong] = useState("");
  const [isFindingLocation, setIsFindingLocation] = useState(false);

  function error() {
    setIsFindingLocation(false);
    setLocationErrorMessage("Unable to retrieve your location");
  }

  function success(position) {
    setIsFindingLocation(false);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLatLong(`${latitude}, ${longitude}`);
    setLocationErrorMessage("");
  }

  function handleTrackLocation() {
    setIsFindingLocation(true);
    if (!navigator.geolocation) {
      setLocationErrorMessage("Geolocation is not supported by your browser.");
      setIsFindingLocation(true);
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }
  return {
    latLong,
    handleTrackLocation,
    locationErrorMessage,
    isFindingLocation,
  };
}
