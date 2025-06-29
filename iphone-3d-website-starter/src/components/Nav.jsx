import React from "react";
import Logo from "../assets/images/logo.svg";
import Search from "../assets/images/search.svg";
import Store from "../assets/images/store.svg";

const Nav = () => {
  return (
    <div>
      <nav className="nav-wrapper">
        <div className="nav-content">
          <ul className="list-styled">
            <li>
              <img src={Logo} alt="Apple" />
            </li>
            <li>
              <a href="#" className="link-styled">
                Store
              </a>
            </li>
            <li>
              <a href="#" className="link-styled">
                Mac
              </a>
            </li>
            <li>
              <a href="#" className="link-styled">
                iPad
              </a>
            </li>
            <li>
              <a href="#" className="link-styled">
                iPhone
              </a>
            </li>
            <li>
              <a href="#" className="link-styled">
                Watch
              </a>
            </li>
            <li>
              <a href="#" className="link-styled">
                AurPods
              </a>
            </li>
            <li>
              <a href="#" className="link-styled">
                TV & Home
              </a>
            </li>
            <li>
              <a href="#" className="link-styled">
                Entertainment
              </a>
            </li>
            <li>
              <a href="#" className="link-styled">
                Accessories
              </a>
            </li>
            <li>
              <a href="#" className="link-styled">
                Support
              </a>
            </li>
            <li>
              <img src={Search} alt="" />
            </li>
            <li>
              <img src={Store} alt="" />
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
