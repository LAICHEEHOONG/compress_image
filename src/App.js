// import logo from "./logo.svg";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Counter } from "./components/counter";
import Home from "./page/home";
import ImagePage from "./page/image";
import FourOFour from "./page/fourOfour";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        {/* <Route path='/image' element={<ImagePage />} ></Route> */}
        <Route path='*' element={<FourOFour />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
