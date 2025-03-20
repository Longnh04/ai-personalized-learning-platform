import React, { useState, useEffect } from "react";
import "../styles/Pages/Home.css";
import { notifications, banners, latestItems } from "../data/pages/HomeData";
import Footer from "../components/layout/Footer";
import { motion } from "framer-motion";

function Course() { 
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user information from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <React.Fragment>
      <div className="home_container ">
        {/* Section 1 */}
        <motion.section
          className="section_first"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <div className="section_first-flex-left">
            <div className="user_name">
              <h1>Welcome back,</h1>
              <h1>{user ? user.username : ''}</h1>
            </div>
            <div className="notify_main">
              <h4 className="new__title">News</h4>
              <ul className="ul-notify-main">
                {notifications.map((notify) => (
                  <a href={notify.link} key={notify.id}>
                    <li className="items-main">
                      <span>{notify.date} -</span> {notify.content}
                    </li>
                  </a>
                ))}
              </ul>
            </div>
          </div>
          <div className="section_first-flex-right">
            <img
              src="https://res.cloudinary.com/dwmwqqkin/image/upload/v1742017029/developer_greibb.svg"
              alt=""
            />
          </div>
        </motion.section>

        {/* Section 2 */}
        <motion.section
          className="section_second"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          {banners.map((banner) => (
            <div className="section_second-banner-item" key={banner.id}>
              <a href={banner.link}>
                <img src={banner.imgSrc} alt={banner.title} />
              </a>
              <span>{banner.title}</span>
            </div>
          ))}
        </motion.section>

        {/* Section 3 */}
        <motion.section
          className="section_third"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <div className="section_third-flex-left">
            <img
              src="https://res.cloudinary.com/dwmwqqkin/image/upload/v1742017060/waving_r3gkzm.svg"
              alt=""
            />
          </div>
          <div className="section_third-flex-right">
            <h1>
              "However difficult life may seem, there is{" "}
              <span>always something you can do</span> and succeed at."
            </h1>
            <p>STEVEN HAWKING</p>

            <div className="section_third-flex-right-child-items">
              {latestItems.map((item) => (
                <div className="item" key={item.id}>
                  <div className="item_img">
                    <a href={item.link}>
                      <img src={item.imgSrc} alt={item.title} />
                    </a>
                  </div>
                  <div className="item_content">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>

      <Footer />
    </React.Fragment>
  );
}

export default Course;