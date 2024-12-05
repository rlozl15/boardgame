import React from "react";

const GameOver = ({ link }) => {
  const handleClick = () => {
    window.location.href = link;
  };

  return (
    <div className="overlay">
      <div className="centered">
        <h1>추리에 성공하셨습니다.</h1>
        <button className="restart-button" onClick={handleClick}>
          암호 해독 내용을 본부에 전달하십시오.
        </button>
        <p>Place: 카페, Time: 미시, Job: 디자이너</p>
      </div>
    </div>
  );
};

export default GameOver;
