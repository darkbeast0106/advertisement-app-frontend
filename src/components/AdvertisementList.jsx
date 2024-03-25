import PropTypes from "prop-types";
import AdvertisementCard from "./AdvertismentCard";

function AdvertisementList(props) {
  const { advertisements } = props;
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 gy-3">
      {advertisements.map((advertisement) => (
        <AdvertisementCard
          key={advertisement.id}
          advertisement={advertisement}
        />
      ))}
      ;
    </div>
  );
}

AdvertisementList.propTypes = {
  advertisements: PropTypes.array,
};

AdvertisementList.defaultProps = {
  advertisements: [],
};

export default AdvertisementList;
