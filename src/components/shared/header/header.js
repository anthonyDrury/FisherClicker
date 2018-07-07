import React from "react";
import { Link, IndexLink } from "react-router";
import Score from "./score/score";
import "./header.scss";

const Header = () => {
  return (
    <div className="header">
      <div className="header__navBar">
        <IndexLink to="/" className="navBar__link" activeClassName="active">
          Home
        </IndexLink>
        <Link to="/about" className="navBar__link" activeClassName="active">
          About
        </Link>
      </div>
      <Score />
    </div>
  );
};

export default Header;
