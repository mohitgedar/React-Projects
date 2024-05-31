import { useState } from "react";
import "./Ratings.css";
import { FaStar } from "react-icons/fa";

export default function Ratings({ noOfStars = 5 }) {

  const [presentRating,setPresentRating] = useState(0);
  const [hover,setHover] =useState(0);

    function handleOnClick(index){
        setPresentRating(index);

    }

    function handleOnMouseEnter(index){
        setHover(index);
    }

    function handleOnMouseLeave(index){
        setHover(presentRating);
    }


    return (
        <div className="container">
            {
                [...Array(noOfStars)].map((_,index)=>
                    {
                        return <FaStar 
                            key={index} 
                            className={index+1 <=( hover||presentRating) ? 'active' :'inactive'}
                            onClick={() => handleOnClick(index+1)} 
                            onMouseMove={()=> handleOnMouseEnter(index+1)}
                            onMouseLeave={()=> handleOnMouseLeave(index+1)}
                            />
                    })
            }        
        </div>
    );
}
