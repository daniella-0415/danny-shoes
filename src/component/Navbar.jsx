// Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Category</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/cart">Cart</Link></li>
      </ul>
    </nav>
  );
}
