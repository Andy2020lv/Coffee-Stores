import Head from "next/head";
import Banner from "../components/banner";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import Card from "../components/card";
import { fetchCoffeeStores } from "../lib/coffee-stores";
import useTrackLocation from "../hooks/use-track-location";
import { useEffect, useState, useContext } from "react";
import { ACTION_TYPES, StoreContext } from "../store/store-context";

export async function getStaticProps(context) {
  const coffeeStores = await fetchCoffeeStores();

  // .catch((err) => console.error(err));
  return {
    props: { coffeeStores }, // will be passed to the page component as props
  };
}
export default function Home(props) {
  const {
    handleTrackLocation,

    locationErrorMessage,
    isFindingLocation,
  } = useTrackLocation();
  const [coffeeStoresError, setCoffeeStoresError] = useState(null);
  const { dispatch, state } = useContext(StoreContext);
  const { coffeeStores, latLong } = state;
  useEffect(() => {
    async function fetchData() {
      if (latLong) {
        try {
          const res = await fetch(
            `/api/getCoffeeStoresByLocation?latLong=${latLong}&limit=15`
          );
          const coffeeStores = await res.json();
          // setCoffeeStores(fetchedCoffeeStores);
          dispatch({
            type: ACTION_TYPES.SET_COFFEE_STORES,
            payload: {
              coffeeStores,
            },
          });
          setCoffeeStoresError("");
        } catch (error) {
          setCoffeeStoresError(error.message);
        }
      }
    }
    fetchData();
  }, [latLong, dispatch]);

  function handleOnBannerBtnClick() {
    handleTrackLocation();
  }
  return (
    <>
      <Head>
        <title>Coffee Connoisseur</title>
        <html lang="eng" />
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Banner
          handleOnClick={handleOnBannerBtnClick}
          buttonText={isFindingLocation ? "Locating..." : "View stores nearby"}
        />
        {locationErrorMessage && (
          <p>Something went wrong: {locationErrorMessage}</p>
        )}
        {coffeeStoresError && <p>Something went wrong: {coffeeStoresError}</p>}
        <div className={styles.coffeeImg}>
          <Image alt="" src="/static/coffee.png" width={500} height={250} />
        </div>
        <div className={styles.sectionWrapper}>
          {coffeeStores.length > 0 && (
            <>
              <h2 className={styles.heading2}>Stores near me</h2>
              <div className={styles.cardLayout}>
                {coffeeStores.map((element) => {
                  return (
                    <Card
                      key={element.id}
                      name={element.name}
                      imgUrl={element.imgUrl}
                      href={`/coffee-store/${element.id}`}
                      className={styles.card}
                    />
                  );
                })}
              </div>
            </>
          )}

          {props.coffeeStores.length > 0 && (
            <>
              <h2 className={styles.heading2}>Toronto Stores</h2>
              <div className={styles.cardLayout}>
                {props.coffeeStores.map((element) => {
                  return (
                    <Card
                      key={element.id}
                      name={element.name}
                      imgUrl={element.imgUrl}
                      href={`/coffee-store/${element.id}`}
                      className={styles.card}
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
