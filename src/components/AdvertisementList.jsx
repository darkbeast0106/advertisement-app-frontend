import PropTypes from "prop-types";
import AdvertisementCard from "./AdvertismentCard";
import MyAdvertisementCard from "./MyAdvertismentCard";

function AdvertisementList(props) {
  const { advertisements, myAdvertisements } = props;
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 gy-3">
      {advertisements.map((advertisement) => (
        myAdvertisements ?
        <MyAdvertisementCard
          key={advertisement.id}
          advertisement={advertisement}
        />
        :
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
  myAdvertisements: PropTypes.bool
};

AdvertisementList.defaultProps = {
  advertisements: [],
  myAdvertisements: false
};

export default AdvertisementList;
