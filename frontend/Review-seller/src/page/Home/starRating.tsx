
import React, { useState } from 'react';
import './Review.css';

interface StarRatingProps {
  totalStars: number;
}

const StarRating: React.FC<StarRatingProps> = ({ totalStars }) => {
  const [selectedStars, setSelectedStars] = useState<number | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const handleStarClick = (index: number) => {
    setSelectedStars(index);
    setNotification("บันทึกแล้ว");
    setTimeout(() => {
      setNotification(null); // ซ่อนข้อความแจ้งเตือนหลังจาก 2 วินาที
    }, 2000);
  };

  return (
    <div className="star-rating">
      {[...Array(totalStars)].map((_, index) => (
        <div key={index} className="star" onClick={() => handleStarClick(index + 1)}>
          {index + 1 <= (selectedStars ?? 0) ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="gold" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="gray" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
            </svg>
          )}
        </div>
      ))}
      {notification && (
        <div className="star-notification">{notification}</div>
      )}
    </div>
  );
};

export default StarRating;
