import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../src/page/Component/Navbar";
import Re_bar from "../src/page/Component/re_bar";
import ProductDisplay from "../src/page/ProductUI/product"; // นำเข้าคอมโพเนนต์ ProductDisplay
import ReviewPage from "../src/page/ProductUI/ReviewPage"

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Re_bar />
        <Routes>
          <Route path="/" element={<ProductDisplay />} /> {/* เส้นทางหลัก */}
          <Route path="/not-review" element={<ProductDisplay />} />
          <Route path="/reviewed" element={<ReviewPage />} />
          <Route path="/product/:id" element={<ProductDisplay />} /> {/* เส้นทางสำหรับแสดงรายละเอียดสินค้า */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
