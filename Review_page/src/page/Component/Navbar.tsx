import "./navbar.css";
import { ChatCircleDots, ShoppingCart, BellRinging, List ,ArrowBendUpLeft } from "phosphor-react";
import Logo from "../../assets/logo.png";
import Chat from "../../assets/chat.png";
import Ordericon from "../../assets/Ordericon.png";
import list from "../../assets/list.png";
import Shopping from "../../assets/shopping-cart.png";
import Back_arrow from "../../assets/back-arrow.png";
import notifications from "../../assets/notifications-button.png";

const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={Logo} className='logo' alt='Course Logo' />
      <div className='right-section'>
        <div className='links'>
          <div className="search">
            <input type="text" placeholder="search" />
          </div>
          <button className="button-login">สร้างการขาย</button>
          <img src={Chat} className="icon chat-icon" />
          <img src={Shopping} className="icon cart-icon" />
          <img src={list} className="icon list-icon" />
          <img src={notifications} className="icon bell-icon" />
          <img src={Back_arrow} className="icon arrow-icon" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
