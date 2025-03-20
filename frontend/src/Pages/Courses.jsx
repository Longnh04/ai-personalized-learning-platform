import React, { useState } from "react";
import "../styles/Pages/Courses.css";
import { CoursesProList } from "../data/pages/CoursesData";
import { FreeCourses } from "../data/pages/CoursesData";
import Footer from "../components/layout/Footer";
import Pagination from "../components/features/PaginationComponent";
import { NavLink } from "react-router-dom";

function Courses() {
  // 1. Thiết lập trạng thái cho trang hiện tại và số mục mỗi trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // 2. Tính toán tổng số trang và dữ liệu hiển thị trên mỗi trang
  const totalPages = Math.ceil(FreeCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFreeCourses = FreeCourses.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // 3. Hàm xử lý khi chuyển trang
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <React.Fragment>
      <div className="courses_container">
        {/* Pro courses */}
        <h1 className="pro_courses-title">
          Pro Courses <i className="fa-brands fa-square-web-awesome-stroke"></i>
        </h1>
        <p className="pro_courses-title-desc">Payment to learn these courses</p>
        <div className="pro_courses">
          {CoursesProList.map((proCourse) => (
            <NavLink
              key={proCourse.id}
              to={`/videoframe`}
              className="pro_courses-item"
            >
              <div className="pro_course-img">
                <img src={proCourse.img} alt={proCourse.name} />
              </div>
              <div className="pro_course-desc">
                <h3>{proCourse.courseName}</h3>
                <div className="pro_course-price">
                  <span>{proCourse.oldPrice}</span>
                  <p>{proCourse.newPrice}</p>
                </div>
                <div className="pro_course-flex">
                  <p>{proCourse.author}</p>
                  <p>
                    <i className="fa-solid fa-clock-rotate-left"></i>{" "}
                    {proCourse.duration}
                  </p>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
        
        {/* Free courses */}
        <h1 className="free_course-title">Free Courses</h1>
        <p className="free_courses-title-desc">
          Sign up to learn these free courses
        </p>
        <div className="free_courses">
          {currentFreeCourses.map((freeCourse) => (
            <div
              key={freeCourse.id}
              className="free_courses-item"
              onClick={() => console.log(freeCourse.courseName)}
            >
              <div className="free_course-img">
                <img src={freeCourse.img} alt={freeCourse.name} />
              </div>
              <div className="free_course-desc">
                <h3>{freeCourse.courseName}</h3>
                <p className="free-course-price text-red-500 font-medium ">
                  {freeCourse.price}
                </p>
                <div className="free_course-flex">
                  <p>{freeCourse.author}</p>
                  <p>
                    <i className="fa-solid fa-clock-rotate-left"></i>{" "}
                    {freeCourse.duration}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Component */}
      <div className="pagination_wrapper">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>

      <Footer />
    </React.Fragment>
  );
}

export default Courses;
