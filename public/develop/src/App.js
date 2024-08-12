import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Category from "./components/Categories/Category";

import './App.css';




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:id/:category" element={<Category />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
