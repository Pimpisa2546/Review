import { useState } from 'react';
import './re_bar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [active, setActive] = useState('not-review'); // ตั้งค่าเริ่มต้นเป็น reviewed หรือ not-review ขึ้นอยู่กับหน้าที่เริ่ม
  const navigate = useNavigate();

  const handleClick = (page: string) => {
    setActive(page);
    navigate(`/${page}`);
  };

  return (
    <div className="nav">
      <div className="text">
        <p
          onClick={() => handleClick('not-review')}
          className={active === 'not-review' ? 'active' : ''}
        >
          ยังไม่ได้รีวิว
        </p>
        <div className="divider"></div> {/* เส้นแบ่ง */}
        <p
          onClick={() => handleClick('review')}
          className={active === 'review' ? 'active' : ''}
        >
          รีวิวแล้ว
        </p>
      </div>
    </div>
  );
  
};

export default Navbar;
