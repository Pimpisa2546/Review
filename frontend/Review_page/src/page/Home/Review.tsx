import { useState } from 'react';
import { PRODUCTS } from "../../interfaces/Product";
import { Course } from "./product";
import ReviewPopup from './ReviewPopup';
import EditReview from './EditReview';
import truck from "../../icons/truck.png";
import checked from "../../icons/checked.png";
import cancle from "../../icons/cancel.png";
import "./Review.css";

const Home = () => {
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [notification, setNotification] = useState("");
  const [hasReviewed, setHasReviewed] = useState(false); // สถานะสำหรับการรีวิว
  
  const showEditPopup = () => {
    setIsEditVisible(true);
  };

  const showPopup = () => {
    setIsPopupVisible(true);
  };

  const hidePopup = () => {
    setIsPopupVisible(false);
  };

  const hideEditPopup = () => {
    setIsEditVisible(false);
  };

  const handleSaveReview = () => {
    setNotification("บันทึกการรีวิวแล้ว!");
    setIsPopupVisible(false);
    setHasReviewed(true); // เปลี่ยนสถานะเป็นมีการรีวิวแล้ว
  };

  const handleEditReview = () => {
    setNotification("แก้ไขการรีวิวแล้ว!");
    setIsEditVisible(false);
  };

  // สมมติว่าคุณต้องการแสดงชื่อของสินค้าชิ้นแรก
  const productTitle = PRODUCTS.length > 0 ? PRODUCTS[0].title : 'ไม่มีสินค้า';

  return (
    <div className='home'>
      <div className="box-title">
        <img src={truck} alt="icon1"/><div className="list-buy"><p>รายการคำสั่งซื้อ</p></div>
        <img src={checked} className="icon2" alt="icon2"/><div className="list-buy"><p>สำเร็จ</p></div>
        <img src={cancle} className="icon3" alt="icon3"/><div className="list-buy"><p>ยกเลิกแล้ว</p></div>
      </div>

      <div className="box-bgProduct">
        <div className="products">
          {PRODUCTS.map((product) => (
            <Course key={product.id} data={product} />
          ))}
        </div>
      </div>

      <div className="name-product-review">
        <b>{productTitle}</b>
      </div>
      <hr />
      <div className="detail-product-review">
        <p>รายละเอียดสินค้า</p>
        <p>ราคา</p>
        <p>จำนวน</p>
      </div>

      <div className="box-success">
        <p>สำเร็จ</p>
      </div>

      {!hasReviewed ? (
        <button onClick={showPopup} className="button-review">
          รีวิวสินค้า
        </button>
      ) : (
        <div className="review-container">
          <button onClick={showEditPopup} className="button-edit-review">
            แก้ไขรีวิวสินค้า
          </button>
        </div>
      )}
      
      {isPopupVisible && (
        <ReviewPopup onClose={hidePopup} onSave={handleSaveReview} />
      )}

      {isEditVisible && (
        <EditReview onClose={hideEditPopup} onSave={handleEditReview} />
      )}
      
      {notification && <div className="notification">{notification}</div>}
    </div>
  );
}

export default Home;
