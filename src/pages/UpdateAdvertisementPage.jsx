import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

function UpdateAdvertisementPage() {
  const apiUrl = import.meta.env.VITE_BACKEND_URL + "api";
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const imageRef = useRef(null);
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const loadAdvertisementData = async () => {
      const response = await fetch(apiUrl+"/advertisement/"+id, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + authToken
        }
      });
      if (response.status == 403) {
        navigate("/my-advertisements");
      } else if (response.ok) {
        const data = await response.json();
        titleRef.current.value = data.title;
        descriptionRef.current.value = data.description;
      }
    }

    loadAdvertisementData();
  }, [id, apiUrl, authToken, navigate])

  useEffect(() => {
    if (!authToken) {
      navigate("/");
    }
  }, [authToken, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const imageName = imageRef.current.value;
    if (imageName == "") {
      updateAdvertisement(title, description);
    } else {
      updateAdvertisementWithImage(title, description);
    }
  };

  const updateAdvertisementWithImage = async (title, description) => {
    const url = apiUrl + "/advertisement/"+id;
    const advertisementFormData = new FormData();
    advertisementFormData.append("_method", "PATCH");
    advertisementFormData.append("title", title);
    advertisementFormData.append("description", description);
    advertisementFormData.append("image", imageRef.current.files[0]);
    const response = await fetch(url, {
      method: "POST",
      body: advertisementFormData,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + authToken,
      }
    })
    console.log(response.status);
    if (response.ok) {
      navigate("/my-advertisements");
    } else {
      const data = await response.text();
      console.error(data);
      alert(data.message);
    }
  }

  const updateAdvertisement = async (title, description) => {
    const url = apiUrl + "/advertisement/"+id;
    const advertisementDTO = {
      title: title,
      description: description,
    };
    console.log(advertisementDTO);
    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(advertisementDTO),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken,
      },
    });
    if (response.ok) {
      navigate("/my-advertisements");
    } else {
      const data = await response.json();
      console.error(data);
      alert(data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Hirdetés módosítása</h2>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Cím
        </label>
        <input className="form-control" type="text" id="title" ref={titleRef} />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Leírás
        </label>
        <textarea
          className="form-control"
          id="description"
          ref={descriptionRef}
          style={{ resize: "none" }}
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="image" className="form-label">
          Kép
        </label>
        <input
          type="file"
          id="image"
          ref={imageRef}
          className="form-control"
          accept="image/png,image/jpg,image/jpeg,image/bmp,image/webp,image/gif,image/svg+xml"
        />
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-warning">
          Módosítás
        </button>
      </div>
    </form>
  );
}

export default UpdateAdvertisementPage;
