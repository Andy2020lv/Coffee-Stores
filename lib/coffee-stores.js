import { createApi } from "unsplash-js";
let photosLenght;

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

function getUrlCoffeeStores(latLong, query, limit) {
  // latLong = latLong.replace(/\s/g, "");
  // latLong = latLong.replace(/,/g, "%2C");
  // console.log(latLong);

  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
  // return "https://api.foursquare.com/v3/places/search?query=coffee&ll=19.296280747405227%2C-70.41452291245933&limit=6";
  // return "https://api.foursquare.com/v3/places/search?query=coffee%20store&&ll=19.29627362384205%2C-70.41451844163133&limit=6";
}

async function getListOfCoffeeShopsPhotos() {
  const photos = await unsplash.search.getPhotos({
    query: "coffee shop",
    perPage: 40,
  });
  return photos.response.results.map((result) => result.urls["small"]);
}

export async function fetchCoffeeStores(
  latLong = "43.653833032607096,-79.37896808855945",
  limit = 6
) {
  const photos = await getListOfCoffeeShopsPhotos();
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  };

  const response = await fetch(
    getUrlCoffeeStores(latLong, "coffee", limit),
    options
  );
  const data = await response.json();
  return data.results.map((result, idx) => {
    const neighborhood = result.location.neighborhood
      ? result.location.neighborhood
      : "";
    // console.log(result.location);
    photosLenght = photos.length;
    return {
      // ...result,
      id: result.fsq_id,
      name: result.name,
      address: result.location.address ? result.location.address : "",
      neighborhood: neighborhood.length > 0 ? neighborhood[0] : "",
      imgUrl: photos.length > 0 ? photos[idx] : null,
    };
  });
}
