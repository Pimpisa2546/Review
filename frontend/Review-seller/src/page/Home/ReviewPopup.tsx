import React from 'react';
import './popup.css';

interface ReviewPopupProps {
  onClose: () => void;
  onSave: () => void; // กำหนดประเภทให้กับ prop onSave
}

const ReviewPopup: React.FC<ReviewPopupProps> = ({ onClose, onSave }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>เขียนรีวิวสินค้า</h2>
        <textarea placeholder="เขียนรีวิวของคุณที่นี่..."></textarea>
        <div className="button-container">
          <button onClick={onSave} className="save-button">บันทึก</button>
          <button onClick={onClose} className="close-button">ยกเลิก</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPopup;
