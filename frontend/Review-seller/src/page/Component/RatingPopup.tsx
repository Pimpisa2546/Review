import React, { useState } from 'react';
import './RatingPopup.css';

interface RatingPopupProps {
  onClose: () => void;
}

const RatingPopup: React.FC<RatingPopupProps> = ({ onClose }) => {
  const [rating, setRating] = useState<number>(0);
  
  

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>คะแนนร้านค้า</h2>
        <div className="rating-stars">
          {[1, 2, 3, 4, 5].map(star => (
            <span
              key={star}
              className={`star ${rating >= star ? 'selected' : ''}`}
              onClick={() => handleRatingChange(star)}
            >
              ⭐
            </span>
          ))}
        </div>
        
        <button onClick={onClose} className="close-button">ปิด</button>
    
      </div>
    </div>
  );
};

export default RatingPopup;
