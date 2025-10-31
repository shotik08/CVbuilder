import { Link } from "react-router-dom";
import "./Navbar.css/"

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">CV Builder</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/templates">Templates</Link></li>
        <li>
          <Link to="/signin" className="get-started-btn">Get Started</Link>
        </li>
      </ul>
    </nav>
  );
}

