import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Rate } from 'antd';

interface Review {
  ID: number;
  Rating: number;
  ProductsID: number;
}

const ShopRating: React.FC<{ sellerID: number; visible: boolean; onClose: () => void; }> = ({ sellerID, visible, onClose }) => {
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [reviewCount, setReviewCount] = useState<number>(0);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get<Review[]>(`http://localhost:8000/review/seller/${sellerID}`);
        if (Array.isArray(response.data)) {
          setReviews(response.data);
        } else {
          console.error('Data is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching reviews', error);
      }
    };

    fetchReviews();
  }, [sellerID]);

  const calculateAverageRating = () => {
    let totalRating = 0;
    let totalReviews = reviews.length;

    reviews.forEach((review) => {
      totalRating += review.Rating;
    });

    if (totalReviews > 0) {
      setAverageRating(totalRating / totalReviews);
      setReviewCount(totalReviews);
    } else {
      setAverageRating(null);
      setReviewCount(0);
    }
  };

  useEffect(() => {
    if (visible) {
      calculateAverageRating();
    }
  }, [visible, reviews]);

  return (
    <Modal
      title="คะแนนร้านค้า"
      open={visible} // แก้ไขที่นี่เพื่อเปลี่ยนจาก visible เป็น open
      onCancel={onClose}
      footer={null}
    >
      {reviewCount > 0 ? (
        <div>
          <p>คะแนนเฉลี่ย: {averageRating?.toFixed(2)} ⭐</p>
          <Rate allowHalf disabled value={averageRating || 0} />  {/* แสดงดาว */}
          <p>จำนวนรีวิว: {reviewCount}</p>
        </div>
      ) : (
        <p>ยังไม่มีรีวิว</p>
      )}
    </Modal>
  );
};

export default ShopRating;
