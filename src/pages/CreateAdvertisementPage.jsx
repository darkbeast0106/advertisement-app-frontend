import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function CreateAdvertisementPage() {
  const apiUrl = import.meta.env.VITE_BACKEND_URL + "api";
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const imageRef = useRef(null);
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();

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
      createAdvertisement(title, description);
    } else {
      createAdvertisementWithImage(title, description);
    }
  };

  const createAdvertisementWithImage = async (title, description) => {
    const url = apiUrl + "/advertisement";
    const advertisementFormData = new FormData();
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
    if (response.ok) {
      alert("Sikeres felvétel");
      clearForm();
    } else {
      const data = await response.text();
      console.error(data);
      alert(data.message);
    }
  }

  const createAdvertisement = async (title, description) => {
    const url = apiUrl + "/advertisement";
    const advertisementDTO = {
      title: title,
      description: description,
    };
    console.log(advertisementDTO);
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(advertisementDTO),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken,
      },
    });
    if (response.ok) {
      alert("Sikeres felvétel");
      clearForm();
    } else {
      const data = await response.json();
      console.error(data);
      alert(data.message);
    }
  };

  const clearForm = () => {
    titleRef.current.value = "";
    descriptionRef.current.value = "";
    imageRef.current.value = "";
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Új hirdetés felvétele</h2>
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
        <button type="submit" className="btn btn-primary">
          Felvétel
        </button>
      </div>
    </form>
  );
}

export default CreateAdvertisementPage;
