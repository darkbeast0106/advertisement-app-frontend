import PropTypes from "prop-types";

function AdvertisementCard(props) {
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
      </div>
    </div>
  );
}

AdvertisementCard.propTypes = {
  advertisement: PropTypes.object.isRequired,
};

export default AdvertisementCard;
