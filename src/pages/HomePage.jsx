import { useEffect, useState } from "react";
import AdvertisementList from "../components/AdvertisementList";

function HomePage() {
  const apiUrl = import.meta.env.VITE_BACKEND_URL + "api";
  const [advertisements, setAdvertisements] = useState(null);

  useEffect(() => {
    async function loadAdvertisements() {
      const response = await fetch(apiUrl + "/advertisement/all");
      if (response.ok) {
        const data = await response.json();
        setAdvertisements(data);
      }
    }
    loadAdvertisements();
  }, [apiUrl]);

  return (
    <>
      <h1>Apróhirdetések</h1>
      {advertisements ? (
        listAdvertisements(advertisements)
      ) : (
        <h2 className="text-center">Adatok betöltése folyamatban...</h2>
      )}
    </>
  );
}

function listAdvertisements(advertisements) {
  return advertisements.length > 0 ? (
    <AdvertisementList advertisements={advertisements} />
  ) : (
    <p>Még nincs felvéve hirdetés</p>
  );
}

export default HomePage;
