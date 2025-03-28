import { createRoot } from "react-dom/client";
import "./index.css";
import { LoginPage } from "./Pages/LoginPage.jsx";
import { RegisterPage } from "./Pages/SignInPage.jsx";
import { LoggedPage } from "./Pages/LoggedPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import { UserProvider } from "./Providers/UserProvider.jsx";

createRoot(document.getElementById("root")).render(
  <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/logged" element={<LoggedPage />} />
      </Routes>
    </BrowserRouter>
  </UserProvider>
);
