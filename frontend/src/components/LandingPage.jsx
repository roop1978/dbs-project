import React, { useState, useEffect } from "react";
import "./LandingPage.css";
const LandingPage = () => {
  const [isNavShrunk, setNavShrunk] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setNavShrunk(true);
      } else {
        setNavShrunk(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const foodItems = [
    " Chicken Breast ",
    " Fresh Grilled Asparagus",
    "Pork-Stuffed Skins",
    " Grilled Chicken",
    " Steak Frites",
  ];

  return (
    <div>
      <link
        href="https://www.fontify.me/wf/67f4cf60703fa3825e31a98e5dd3a966"
        rel="stylesheet"
        type="text/css"
      />
      <div className="container bg">
        <nav
          className={`navbar navbar-default ${isNavShrunk ? "shrink" : ""}`}
          id="navbar"
        >
          <div className="container-fluid">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-1"
                aria-expanded="false"
                id="toggle-btn"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"> </span>
                <span className="icon-bar"> </span>
                <span className="icon-bar"> </span>
              </button>
            </div>
            <div
              className="collapse navbar-collapse"
              id="bs-example-navbar-collapse-1"
            >
              <ul className="nav navbar-nav" id="menu">
                <li>
                  {" "}
                  <a href="#about-us" id="about">
                    {" "}
                    about us{" "}
                  </a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="#food-items"> our menu </a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="#arrangments"> special offers </a>{" "}
                </li>
                <li>
                  {" "}
                  <a>
                    {" "}
                    <img
                      src="https://demo.kallyas.net/phaeton-restaurant-bar-pub/wp-content/uploads/sites/7/2016/11/logo.png"
                      id="img-logo"
                      alt="Logo"
                    />{" "}
                  </a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="#order-now"> reservation </a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="#Contact"> location </a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="#discount"> subscribe </a>{" "}
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 col-xs-12">
              <p className="title"> organic natural food </p>
              <p className="brief">
                {" "}
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod{" "}
              </p>
              <p>
                {" "}
                <button type="button" id="see">
                  {" "}
                  <a
                    href="#food-items"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    {" "}
                    SEE OUR MENU{" "}
                  </a>{" "}
                </button>{" "}
              </p>
            </div>
          </div>

          {/* ABOUT US SECTION */}
          <section id="about-us">
            <div className="row">
              <div className="col-md-6 col-xs-12 intro-about">
                <div>
                  <p className="about"> ABOUT </p>
                  <p className="desc">
                    {" "}
                    Our Chefs offer you perfect cooking, best served dishes with
                    fresh ingredients and old recipes. We have only carefully
                    sourced and seasonal ingredients in our disposal to make
                    rustic dishes. We provide you with daily self-made bread,
                    sourdough pizza, roasted fish-meat-vegetables and many more.{" "}
                  </p>
                  <p>
                    {" "}
                    <button type="button" id="read-more">
                      {" "}
                      READ MORE{" "}
                    </button>{" "}
                  </p>
                </div>
              </div>
              <div className="col-md-6 col-xs-12" id="img-contain"></div>
            </div>
          </section>

          {/* TODAYS SPECIALITY SECTION */}
          <section className="todays-speciality">
            <div className="row" id="today">
              <div className="col-md-12 col-xs-12">
                <p className="today-title"> Today's Speciality </p>
                <p className="today-brief">
                  {" "}
                  Chicken with vegetables: mashed potatoes, bean pods, croutons,
                  cranberry jam,rosemary{" "}
                </p>
                <p>
                  {" "}
                  <button type="button" id="menu-btn">
                    {" "}
                    7 day's menu{" "}
                  </button>{" "}
                </p>
                <div></div>
              </div>
            </div>
          </section>

          {/* FOOD ITEMS SECTION */}
          <section className="food-items" id="food-items">
            <h1 id="menu-title"> menu </h1>
            <div className="row">
              <div className="col-md-3 col-xs-12">
                <span className="category"> meat </span>
                <div className="lists">
                  <ul className="list">
                    {foodItems.map((item, index) => (
                      <li key={index}>
                        {item}
                        <span>.................</span>
                        <b>$19.50</b>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-md-3 col-xs-12">
                <span className="category"> sides</span>
                <div className="lists">
                  <ul className="list">
                    {/* Populate your side items similarly */}
                  </ul>
                </div>
              </div>
              <div className="col-md-3 col-xs-12">
                <span className="category"> pasta </span>
                <div className="lists">
                  <ul className="list">
                    {/* Populate your pasta items similarly */}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* DELIVERY SECTION */}
          <section id="delivery">
            <div className="row">
              <div className="col-md-6 col-xs-12 pic"></div>
              <div className="col-md-6 col-xs-12 description-delivery">
                <span id="delivery-title"> Delivery </span>

                <p className="delivery-desc">
                  {" "}
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut.
                </p>
                <p>
                  {" "}
                  <button type="button" id="order">
                    {" "}
                    <a
                      href="#order-now"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      {" "}
                      order now{" "}
                    </a>{" "}
                  </button>{" "}
                </p>
              </div>
            </div>
          </section>

          {/* SERVICE SECTION */}
          <section id="service" className="service-bg">
            <div className="row">
              <div className="col-md-12 col-xs-12">
                <p className="service-title"> best service ever </p>
                <p className="service-brief">
                  {" "}
                  Our 3 Michelin Stars ensure that your experience regarding our
                  cuisine will be one that you will not forget.{" "}
                </p>
                <p>
                  {" "}
                  <img
                    src="https://demo.kallyas.net/phaeton-restaurant-bar-pub/wp-content/uploads/sites/7/2016/06/3-flowers.png"
                    className="img-service"
                    alt="3 Stars"
                  />{" "}
                </p>
              </div>
            </div>
          </section>

          {/* ARRANGEMENTS SECTION */}
          <section id="arrangments">
            <div className="row event">
              <div className="col-md-3 col-xs-12 event-mgmt">
                <div className="img-bg img-circle">
                  <img
                    src="https://s4.postimg.org/41nxsk4st/wedding-cake_2.png"
                    alt="Wedding Cake"
                  />
                </div>

                <div className="birthday">
                  <span className="font-setting"> birthdays </span>
                  <p className="description">
                    Book a table for two with the best Italian dishes served for
                    the anniversary. Or reserve a bigger one for a huge family
                    to get together one sunny day. Gather your friends together{" "}
                  </p>
                </div>
              </div>
              <div className="col-md-3 col-xs-12 event-mgmt">
                <div className="img-bg img-circle">
                  <img
                    src="https://s21.postimg.org/h3hfabufr/business-meeting.png"
                    alt="Business Meeting"
                  />
                </div>
                <div className="meeting">
                  <span className="font-setting"> meetings </span>
                  <p className="description">
                    {" "}
                    You can also impress your boss by choosing the best place
                    for corporate party with your co-workers. Reserve a spacious
                    room, set the menu, choose the drinks and invite guests.
                  </p>
                </div>
              </div>
              <div className="col-md-3 col-xs-12 event-mgmt">
                <div className="img-bg img-circle">
                  <img
                    src="https://s2.postimg.org/49b7a0lsp/christmas-ribbon.png"
                    alt="Christmas Ribbon"
                  />
                </div>
                <div className="wedding">
                  <span className="font-setting"> weddings </span>
                  <p className="description">
                    {" "}
                    75 seats for 75 guests are all at your disposal. Organize a
                    party for a huge company and have fun in the restauran. Show
                    your friends the real world of European cuisine and
                    especially Italian vibes.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* TASTY DESSERTS SECTION */}
          <section id="tasty-desserts">
            <div className="row" id="dessert">
              <div className="col-md-12 col-xs-12">
                <p className="tasty-title"> Tasty Desserts </p>
                <p className="tasty-desc">
                  {" "}
                  Whether you crave sweet, savory, decadent or healthy,
                  <br />
                  we have hundreds of top-rated dessert recipes to satisfy your
                  taste buds.{" "}
                </p>
              </div>
            </div>
          </section>

          {/* ORDER NOW SECTION */}
          <section id="order-now">
            <div className="row">
              <div className="col-md-3 col-xs-12 details">
                <p className="heading"> Events </p>
                <p className="sub-detail">
                  {" "}
                  We put at your disposal our place and staff to celebrate your
                  Birthday, the 10th year anniversary with your colleagues even
                  your Weddings.{" "}
                </p>
                <p>
                  {" "}
                  <button type="button" className="find">
                    {" "}
                    Find Out More{" "}
                  </button>{" "}
                </p>
              </div>
              <div className="col-md-3 col-xs-12 details">
                <p className="heading"> Opening Hours </p>
                <p
                  style={{
                    fontWeight: "bold",
                    fontFamily: "Montserrat",
                    fontSize: "1.30em",
                    marginTop: "30px",
                  }}
                >
                  {" "}
                  Monday - Saturday{" "}
                </p>
                <p style={{ fontWeight: 300, fontFamily: "Montserrat" }}>
                  {" "}
                  12pm - 10:30pm{" "}
                </p>

                <p
                  style={{
                    fontWeight: "bold",
                    fontFamily: "Montserrat",
                    fontSize: "1.30em",
                  }}
                >
                  {" "}
                  Sunday{" "}
                </p>
                <p style={{ fontWeight: 300, fontFamily: "Montserrat" }}>
                  {" "}
                  12pm - 9pm{" "}
                </p>
                <p
                  style={{
                    fontWeight: 300,
                    fontFamily: "Montserrat",
                    marginTop: "30px",
                  }}
                >
                  {" "}
                  Fruits de mer & cold food available 3-5:00pm{" "}
                </p>
              </div>
              <div className="col-md-3 col-xs-12 details">
                <p className="heading"> find a table </p>
                <p className="sub-detail">
                  {" "}
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut.{" "}
                </p>
                <p className="call">
                  {" "}
                  <i className="fa fa-phone"> </i> CALL: 0800 1800 1800{" "}
                </p>
              </div>
            </div>
          </section>

          {/* DISCOUNT SECTION */}
          <section className="discount" id="discount">
            <div className="row">
              <div className="col-md-12 col-xs-12 dis-coupon">
                <p className="dis-title"> discount coupon </p>
                <p className="mail">
                  {" "}
                  Enter your email address for a 20% off voucher next time you
                  come visit us
                </p>
                <p>
                  {" "}
                  <input
                    type="text"
                    placeholder="Your email address"
                    className="mail-address"
                    required
                  />{" "}
                </p>
                <button type="button" id="subscribe">
                  {" "}
                  SUBSCRIBE{" "}
                </button>

                <ul className="social-media">
                  <li>
                    {" "}
                    <a>
                      {" "}
                      <i className="fa fa-facebook"> </i>{" "}
                    </a>{" "}
                  </li>
                  <li>
                    {" "}
                    <a>
                      {" "}
                      <i className="fa fa-twitter"> </i>{" "}
                    </a>{" "}
                  </li>
                  <li>
                    {" "}
                    <a>
                      {" "}
                      <i className="fa fa-linkedin"> </i>{" "}
                    </a>{" "}
                  </li>
                </ul>
                <ul className="hori-menu">
                  <li>
                    {" "}
                    <a href="#about-us"> About Us </a>{" "}
                  </li>
                  <li>
                    {" "}
                    <a href="#food-items"> our menu </a>{" "}
                  </li>
                  <li>
                    {" "}
                    <a href="#arrangments"> special offers </a>{" "}
                  </li>
                  <li>
                    {" "}
                    <a href="#order-now"> reservation </a>{" "}
                  </li>
                  <li>
                    {" "}
                    <a href=""> location </a>{" "}
                  </li>
                  <li>
                    {" "}
                    <a href="#discount"> subscribe </a>{" "}
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
