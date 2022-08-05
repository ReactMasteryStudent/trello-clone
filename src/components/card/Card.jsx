import React from 'react'
import "./Card.scss";

const Card = ({ card }) => {
  return (
    <div className="card">
        <h3>{ card.title }</h3>
    </div>
  )
}

export default Card;