import React, { useState } from 'react';
import "./navbar.css";
import { ChatCircleDots, ShoppingCart, BellRinging, List, ArrowBendUpLeft } from "phosphor-react";
import Logo from "../../assets/logo.png";
import RatingPopup from './RatingPopup';

const Navbar = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const showPopup = () => {
    setIsPopupVisible(true);
  };

  const hidePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className='navbar'>
      <img src={Logo} className='logo' alt='Course Logo' />
      <div className='right-section'>
        <div className='links'>
          <button className="button-Review">รีวิว</button>
          <button className="button-rating" onClick={showPopup}>คะแนนร้านค้า</button>
          <button className="button-addproduct">เพิ่มสินค้า</button>
          <ChatCircleDots size={32} className="icon chat-icon" />
          <ShoppingCart size={32} className="icon cart-icon" />
          <List size={32} className="icon list-icon" />
          <BellRinging size={32} className="icon bell-icon" />
          <ArrowBendUpLeft size={32} className="icon arrow-icon" />
        </div>
      </div>
      {isPopupVisible && <RatingPopup onClose={hidePopup} />}
    </div>
  );
}

export default Navbar;
