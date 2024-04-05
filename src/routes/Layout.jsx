import { Outlet, Link } from "react-router-dom";
import '../App.css'

const Layout = () => {
  return (
    <div>
      <nav>
        <ul>
          <Link to="/" className="home-button">Home</Link>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;