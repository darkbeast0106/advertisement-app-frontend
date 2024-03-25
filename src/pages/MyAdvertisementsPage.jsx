import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AdvertisementList from "../components/AdvertisementList";

function MyAdvertisementsPage() {
  const apiUrl = import.meta.env.VITE_BACKEND_URL+"api";
  const navigate = useNavigate();
  const [advertisements, setAdvertisements] = useState(null);
  const authContext = useContext(AuthContext);
  const { authToken, logout } = authContext;

  useEffect(() => {
    const loadAdvertisements = async () => {
      const response = await fetch(apiUrl + "/advertisement", {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setAdvertisements(data);
      } else if (response.status == 401) {
        logout();
      }
    };

    if (authToken) {
      loadAdvertisements();
    } else {
      navigate("/login");
    }
  }, [apiUrl, authToken, logout, navigate]);

  return (
    <div>
      {advertisements ? (
        <>
          <h2>Saját hirdetéseim</h2>
          {advertisements.length == 0 ? (
            <p>Még nincs felvéve hirdetés</p>
          ) : (
            <AdvertisementList advertisements={advertisements} />
          )}
        </>
      ) : (
        <h2 className="text-center">Adatok betöltése folyamatban...</h2>
      )}
    </div>
  );
}

export default MyAdvertisementsPage;
