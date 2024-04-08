import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function MyAdvertisementCard(props) {
  const { advertisement } = props;
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  return (
    <div className="col">
      <div className="card h-100">
        {advertisement.image ? (
          <img
            className="card-image-top"
            src={backendURL + advertisement.image}
            alt={advertisement.title}
          />
        ) : (
          ""
        )}
        <div className="card-body">
          <h4>{advertisement.title}</h4>
          <p>{advertisement.description}</p>
        </div>
        <div className="card-footer">
          <div className="d-grid gap-1">
            <Link className="btn btn-warning" to={"/update-advertisement/" + advertisement.id }>Módosítás</Link>
            <button className="btn btn-danger">Törlés</button>
          </div>
        </div>
      </div>
    </div>
  );
}

MyAdvertisementCard.propTypes = {
  advertisement: PropTypes.object.isRequired,
};

export default MyAdvertisementCard;
