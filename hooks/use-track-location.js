import React, { useContext, useState } from "react";
import { ACTION_TYPES, StoreContext } from "../store/store-context";
export default function useTrackLocation() {
  const [locationErrorMessage, setLocationErrorMessage] = useState("");
  //   const [latLong, setLatLong] = useState("");
  const [isFindingLocation, setIsFindingLocation] = useState(false);
  const { dispatch } = useContext(StoreContext);

  function error() {
    setIsFindingLocation(false);
    setLocationErrorMessage("Unable to retrieve your location");
  }

  function success(position) {
    setIsFindingLocation(false);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    // setLatLong(`${latitude},${longitude}`);
    dispatch({
      type: ACTION_TYPES.SET_LAT_LONG,
      payload: { latLong: `${latitude},${longitude}` },
    });
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
    // latLong,
    handleTrackLocation,
    locationErrorMessage,
    isFindingLocation,
  };
}
