import React from "react";
import IPhone from "../assets/images/iphone-14.jpg";
import HoldingIphone from "../assets/images/iphone-hand.png";

const Jumbotron = () => {
  const handleLearnMore = () => {
    const element = document.querySelector(".sound-section");
    window.scrollTo({
      top: element?.getBoundingClientRect().top,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="jumbotron-section wrapper">
      <h1 className="title">New</h1>
      <img src={IPhone} className="log" alt="iPhone 14 Pro" />
      <p className="text">Big and Bigger.</p>
      <span className="description">
        From $41.62/mo. for 24 mo. or $999 before trade-in.
      </span>
      <ul className="links">
        <li>
          <button className="button">Buy</button>
        </li>
        <li>
          <a onClick={handleLearnMore} href="#" className="link">
            Learn More
          </a>
        </li>
      </ul>
      <img src={HoldingIphone} className="iphone-img" alt="iPhone" />
    </div>
  );
};

export default Jumbotron;
