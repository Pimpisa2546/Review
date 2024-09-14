import React, { useState } from 'react';
import axios from 'axios';
import './popup.css';
import StarRating from './starRating';

interface EditReviewProps {
  onClose: () => void;
  onSave: () => void;
}

const EditReview: React.FC<EditReviewProps> = ({ onClose, onSave }) => {
  const [rating, setRating] = useState<number | null>(null); // ค่า rating เริ่มต้น
  const [comment, setComment] = useState(''); // ค่า comment เริ่มต้น
  const [productId, setProductID] = useState(1); // ตั้งค่าตัวอย่าง Product ID

  const handleSave = async () => {
    if (rating === null) {
      alert("กรุณาเลือกคะแนนก่อนบันทึก");
      return;
    }

    try {
      const reviewData = {
        rating: rating,
        comment: comment,
        productsID: productId,
      };

      const response = await axios.post("http://localhost:8000/review", reviewData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Review saved:", response.data);
      alert("แก้ไขรีวิวสำเร็จ!");
      onSave();
    } catch (error) {
      console.error("Error saving review:", error);
      alert("เกิดข้อผิดพลาดในการบันทึกรีวิว");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>แก้ไขรีวิวสินค้า</h2>
        <div>
          <StarRating
            totalStars={5}
            onSelect={setRating} // ตั้งค่า rating โดยใช้ฟังก์ชันที่มาจาก props
          />
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="เขียนรีวิวของคุณที่นี่..."
          required
        />
        <div className="button-container">
          <button onClick={handleSave} className="save-button">บันทึก</button>
          <button onClick={onClose} className="close-button">ยกเลิก</button>
        </div>
      </div>
    </div>
  );
};

export default EditReview;
