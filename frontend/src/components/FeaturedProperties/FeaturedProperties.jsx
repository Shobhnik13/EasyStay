import useFetch from "../../hooks/useFetch";
import "../FeaturedProperties/FeaturedProperties.css";
import superior_hotel from '../FeaturedProperties/superior-hotel.jpg'
const FeaturedProperties = () => {
  const {data,err,loading}=useFetch('http://localhost:8000/hotels?featured=true')
    // console.log(data)
  return (

    <div className="fp">
      {loading ?('Loading data please wait!'):(<>
      {data && data.map((item,index)=>{
        return(
          <div className="fpItem">
        <img
          src={item.pictures[0]}
          alt=""
          className="fpImg"
        />
        <span className="fpName">{item.name}</span>
        <span className="fpCity">{item.city}</span>
        <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
        {item.rating && <div className="fpRating">
          <button>{item.rating}</button>
          <span>Excellent</span>
        </div>}
      </div>
        )
      })}
      </>)}
    </div>
  );
};

export default FeaturedProperties;