import { useState } from 'react';


import {Megaphone,UserCircle} from "phosphor-react";

import "./Review.css";

const Home = () => {
  

  return (
    <div className='home'>
      <Megaphone size={40} className="icon Mega" />
      <div className="review-buy"><b>รีวิวจากผู้ซื้อ</b></div>
      <div className="box-reviewSell1">
        <UserCircle size={80} className="icon user" />
        <div className="detail-Inreview">
          <b>ชื่อผู้ใช้</b>
          <p>ข้อความรีวิว</p>
        </div>
      </div>
      <div className="box-reviewSell2">
        <UserCircle size={80} className="icon user" />
        <div className="detail-Inreview">
          <b>ชื่อผู้ใช้</b>
          <p>ข้อความรีวิว</p>
        </div>
      </div>
    </div>
  );
}

export default Home;