import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";
import MyOrder from "./pages/MyOrder";
import OrderDetails from "./pages/OrderDetails";
import {io} from "socket.io-client"
import { useEffect, useMemo, useState } from "react";
import Navbar from "./components/common/Navbar";
import AdminPage from "./pages/AdminPage";

function App() {

  

  return (

    <>
    
    <Navbar />
    <Routes>
      
      <Route path="/" element={<HomePage/>} ></Route>
      <Route path="/login" element={<LoginPage/>}></Route>
      <Route path="/signup" element={<SignupPage/>}></Route>
      <Route path="/cart" element={<CartPage />}></Route>
      <Route path="/myorder" element={<MyOrder />}></Route>
      <Route path="/order/:id" element={<OrderDetails />}></Route>
      <Route path="/admin" element={<AdminPage />}></Route>
    </Routes>
    </>
    
  );
}

export default App;
