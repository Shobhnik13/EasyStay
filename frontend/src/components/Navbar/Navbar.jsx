import "../Navbar/Navbar.css";
import { Link } from "react-router-dom";
const Navbar = () => {

  return (
    <div className="navbar bg-gradient-to-l from-blue-700 to-blue-400">
      <div className="navContainer ">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo font-bold text-3xl text-blue-800">EasyStay</span>
        </Link>
        {/* {user ? user.username : ( */}
          <div className="navItems">
            <button className="navButton bg-blue-400 font-semibold">Register</button>
            <button className="navButton  bg-blue-400 font-semibold">Login</button>
          </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default Navbar