import React from 'react' ;
import ReactStars from 'react-rating-stars-component';
import profilePng from "../../images/Profile.png" ;
import "./ReviewCard.css" ;

const ReviewCard = ({ review }) => {

    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "yellow",
        size:"small",
        size: window.innerWidth < 600 ? 20 : 25,
        value: review.rating,
        precision:0.5,
        isHalf: true,
      };
  return (
    <div className="reviewCard">
        <img src ={profilePng} alt ="User"/>
        <p>{review.name}</p>
        <ReactStars {...options}/>
        <span>{review.comment}</span>
    </div>
  ) ;
};

export default ReviewCard
