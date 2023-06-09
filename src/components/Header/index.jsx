import { NavLink } from "react-router-dom";
import "./index.scss";

export const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-name">VIN Decoder</div>
        <nav className="header-navigation">
          <li>
            <NavLink to="/" className="header-link">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/variables" className="header-link">
              Variables
            </NavLink>
          </li>
        </nav>
      </div>
    </header>
  );
};
