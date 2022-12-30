import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

function getUrlCoffeeStores(latLong, query, limit) {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
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
