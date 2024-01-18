import styles from "./page.module.css";
import Gallery from "./gallery";
import SortingContextProvider from "./context/sorting-context";
import UserContextProvider from "./context/user-context";

export default function Home() {
  return (
    <main className={styles.main}>
      <UserContextProvider>
        <SortingContextProvider>
          <Gallery />
        </SortingContextProvider>
      </UserContextProvider>
    </main>
  );
}