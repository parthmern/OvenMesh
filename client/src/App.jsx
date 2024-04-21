import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";

function App() {
  return (
    
    <Routes>
      <Route path="/" element={<HomePage/>} ></Route>
      <Route path="/login" element={<LoginPage/>}></Route>
      <Route path="/signup" element={<SignupPage/>}></Route>
      <Route path="/cart" element={<CartPage />}></Route>
    </Routes>

  );
}

export default App;
