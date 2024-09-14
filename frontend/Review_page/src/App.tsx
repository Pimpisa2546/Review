import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./page/Home/Review"
import Navbar from "../src/page/Component/Navbar"

function App(){

  return(<div className="App">
    <Router>
      <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
          </Routes>
    </Router>
  </div>)
}

export default App