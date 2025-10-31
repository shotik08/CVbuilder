import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Templates from "./pages/Templates";
import Builder from "./pages/Builder";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

export default function App() {

  
  return (
    <Router>
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

