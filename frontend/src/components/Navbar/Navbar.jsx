import { useContext } from "react";
import "../Navbar/Navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
const Navbar = () => {
  const {user}=useContext(AuthContext)
  return (
    <div className="navbar bg-gradient-to-l from-blue-700 to-blue-400">
      <div className="navContainer ">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo font-bold text-3xl text-blue-800">EasyStay</span>
        </Link>
        {/* {user ? user.username : ( */}
         {user ?(<h1 className="font-bold  text-3xl text-green-500">{user.username}</h1>):(<div className="navItems">
            <button className="navButton bg-blue-400 font-semibold">Register</button>
            <Link to={'/login'}>
            <button className="navButton  bg-blue-400 font-semibold">Login</button>
            </Link>
          </div>)}
        {/* )} */}
      </div>
    </div>
  );
};

export default Navbar