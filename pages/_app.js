import "../styles/globals.css";
import StoreProvider from "../store/store-context";
export default function App({ Component, pageProps }) {
  return (
    <div>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </div>
  );
}
