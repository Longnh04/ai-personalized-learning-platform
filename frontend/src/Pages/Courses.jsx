import React, { useState, useEffect } from "react";
import "../styles/Pages/Courses.css";
// import { CoursesProList } from "../data/pages/CoursesData";
// import { FreeCourses } from "../data/pages/CoursesData";
import Footer from "../components/layout/Footer";
import Pagination from "../components/features/PaginationComponent";
import { NavLink } from "react-router-dom";
import axios from 'axios';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/api/courses');
        setCourses(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourses();
  }, []);

  // Tính toán tổng số trang và dữ liệu hiển thị trên mỗi trang
  const totalPages = Math.ceil(courses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCourses = courses.slice(startIndex, startIndex + itemsPerPage);
  
  // Hàm xử lý khi chuyển trang
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const proCourses = courses.filter(course => !course.isFree);
  console.log('Khóa học trả phí:', proCourses);  

  return (
    <React.Fragment>
      <div className="courses_container">
        {/* Pro courses */}
        <h1 className="pro_courses-title">
          Pro Courses <i className="fa-brands fa-square-web-awesome-stroke"></i>
        </h1>
        <p className="pro_courses-title-desc">Payment to learn these courses</p>
        <div className="pro_courses">
        {proCourses.length > 0 ? (
          proCourses.map((proCourse) => (
            <NavLink
              key={proCourse.id}
              to={`/watch/${proCourse.id}`} // Điều hướng đến trang VideoWatching với courseId
              className="pro_courses-item"
            >
              {/* Nội dung khóa học */}
              <div className="pro_course-img">
                <img src={proCourse.img} alt={proCourse.courseName} />
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
          ))
        ) : (
          <p>Không có khóa học trả phí.</p>
        )}
        </div>



        {/* Free courses */}
        <h1 className="free_course-title">Free Courses</h1>
        <p className="free_courses-title-desc">
          Sign up to learn these free courses
        </p>
        <div className="free_courses">
          {currentCourses.filter(course => course.isFree).map((freeCourse) => (
            <div
              key={freeCourse.id}
              className="free_courses-item"
            >
              <div className="free_course-img">
                <img src={freeCourse.img} alt={freeCourse.courseName} />
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
 