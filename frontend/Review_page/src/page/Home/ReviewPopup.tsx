import React, { useState } from 'react';
import axios from 'axios';
import './popup.css';
import StarRating from './starRating';
import Home from './Review';

interface ReviewPopupProps {
  onClose: () => void;
  onSave: (content: string, rating: number | null) => void; // onSave รับ content และ rating เป็นพารามิเตอร์
}

const ReviewPopup: React.FC<ReviewPopupProps> = ({ onClose, onSave }) => {
  const [rating, setRating] = useState<number | null>(null); // ค่า rating เริ่มต้น
  const [comment, setComment] = useState(''); // ค่า comment เริ่มต้น
  const [productId, setProductID] = useState(1); // ตั้งค่าตัวอย่าง Product ID

  const handleSave = async () => {
    if (rating === null) {
      alert("กรุณาเลือกคะแนนก่อนบันทึก");
      return Home;
    }

    try {
      const reviewData = {
        rating: rating,
        comment: comment,
        productsID: productId,
      };

      // ส่งข้อมูลไปยังเซิร์ฟเวอร์ (API)
      const response = await axios.post("http://localhost:8000/review", reviewData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Review saved:", response.data);
      alert("รีวิวสินค้าสำเร็จ!");
      onSave(comment, rating); // ส่งค่าคอมเมนต์และ rating กลับไปให้ Home component ผ่าน onSave
    } 
      catch (error) {
      console.error("Error saving review:", error);
      alert("เกิดข้อผิดพลาดในการบันทึกรีวิว");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>เขียนรีวิวสินค้า</h2>
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

export default ReviewPopup;
