import { createRoot } from "react-dom/client";
import "./index.css";
import { LoginPage } from "./Pages/LoginPage.jsx";
import { RegisterPage } from "./Pages/SignInPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route index path="/" element={<LoginPage/>} />
      <Route path="/register" element={<RegisterPage/>} />
    </Routes>
  </BrowserRouter>
);
