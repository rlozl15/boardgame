import React from "react";

const Card = ({ id, name, category, flipped, matched, clicked }) => {
  return (
    <div
      onClick={() => clicked(name, id, category)}
      className={
        `card ${flipped ? "flipped" : ""} ${matched ? "matched" : ""}`
      }
    >
      <div className="front">
        <img alt={name} src={process.env.PUBLIC_URL + `/cards/${name}.png`} />
      </div>
      <div className="back">
        <img alt="back" src={process.env.PUBLIC_URL + "/cards/back.png"} />
      </div>
    </div>
  );
};

export default Card;
