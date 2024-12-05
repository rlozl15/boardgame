import React from 'react';

// 모달 컴포넌트
const Popup = ({ onResponse }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h2>추리하시겠습니까?</h2>
        <div className="popup-buttons">
          <button onClick={() => onResponse("yes")}>Yes</button>
          <button onClick={() => onResponse("no")}>No</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;