// src/RoadmapTesting.js
import React, { useState, useEffect } from "react";
import { useAuth } from '../context/AuthContext';
import "../styles/Pages/Roadmap.css";
import { NavLink } from "react-router-dom";
import { RoadmapCard } from "../data/pages/RoadmapData";
import Footer from "../components/layout/Footer";
import submitButton from "../components/common/submitButton";
import PageLost from "../components/common/PageLost";

const RoadmapTesting = () => {
  const [roadmapData, setRoadmapData] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    // Kiểm tra user tồn tại trước khi fetch
    if (!user) {
      console.log('Vui lòng đăng nhập để xem roadmap');
      return;
    }

    async function fetchRoadmap() {
      try {
        // Sử dụng user.id từ context thay vì hardcode
        const response = await fetch(`/api/roadmap/${user.id}`);
        if (response.ok) {
          const data = await response.json();
          setRoadmapData(data);
        } else {
          console.error('Không thể lấy dữ liệu roadmap');
        }
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    }

    fetchRoadmap();
  }, [user]); // Thêm user vào dependencies để useEffect chạy lại khi user thay đổi

  // Thêm loading state khi chưa có user
  if (!user) {
    return <div className=" h-full">
       <PageLost />
    </div>;
  }

  return (
    <React.Fragment>
      <div className="roadmap_container">
        <h1 className="roadmap_container-title highlight mb-[1.5rem]">
          Discover the roadmap that's right for you
        </h1>
        <p className="roadmap_container-desc">
          To get a head start, you should focus on create a roadmap for you!
        </p>
        <p className="roadmap-desc">
          This test helps you evaluate your interests, current skills, and find
          the right field for you such as: Front-end Developer, Back-end
          Developer, Fullstack Developer, Cyber Security,...
        </p>
      </div>
      <div className="create_rm">
        <NavLink to="/roadmaptesting" activeClassName="active">
          {submitButton()}
        </NavLink>
      </div>
     
      <div className="roadmap_recommendation-container  ">
        {/* Road map for user after render be start here! */}
        {roadmapData ? (
          <>
            <h3 className="font-semibold uppercase mt-4 mb-4 text-[#2bef90]"> <span className=" font-semibold uppercase mt-4 mb-4 text-black">Lộ trình của bạn là:</span> {roadmapData.roadmap_path}</h3>
            <p>
              <span className="font-semibold text-[#2bef90]">
                Lý do vì sao bạn nên theo đuổi lộ trình này:
              </span>
              <span dangerouslySetInnerHTML={{
                  __html: roadmapData.reason.replace(/\**\*/g, '<br />')
                }} />
            </p>
            {roadmapData.courses && (
          <>
            <h4 className="text-[#2bef90] font-semibold uppercase mt-4 mb-7">Các khóa học Basic phù hợp với bạn:</h4>
            <ul
              className="flex flex-wrap gap-4"
            >
              {roadmapData.courses.basic && roadmapData.courses.basic.map((course) => (
                 <div className="course_recommend max-w-[250px] mb-4 cursor-pointer ">
                 <div 
                    className="img_contain"
                    style={{
                      borderTopLeftRadius: "15px",
                      borderTopRightRadius: "15px",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      width: "100%"
                    }}
                 >
                    <img
                    style={{
                      borderTopLeftRadius: "15px",
                      borderTopRightRadius: "15px",
                      width: "100%"
                    }}
                    
                    src={course.img} alt="image-courses"/>
                 </div>

                <div 
                    className="course_decs p-[1.2rem] "
                    style={{
                       backgroundColor: "#00000008",
                       borderBottomLeftRadius: "15px",
                       borderBottomRightRadius: "15px",

                    }}    
                >
                      <li className="font-semibold mb-1" key={course.id}>{course.courseName}</li>
                      <li className="font-normal mb-1 text-red-500">{"Price : "} {course.price}</li>
                      <div className="footer_course flex justify-between">
                        <li className="font-normal">{course.author}</li>
                        <li className="font-normal">{course.duration}</li>
                      </div>
                </div>
               </div>
                  
              ))}
            </ul>
            <h4 className="text-[#2bef90] font-semibold uppercase mt-4 mb-7">Các khóa học Advanced phù hợp với bạn:</h4>
            <ul className="flex flex-wrap gap-4">
              {roadmapData.courses.advanced && roadmapData.courses.advanced.map((course) => (
                  
                 <div className="course_recommend max-w-[250px] mb-4 cursor-pointer">
                   <div 
                      className="img_contain"
                      style={{
                        borderTopLeftRadius: "15px",
                        borderTopRightRadius: "15px",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        width: "100%"
                      }}
                   >
                      <img
                      style={{
                        borderTopLeftRadius: "15px",
                        borderTopRightRadius: "15px",
                        width: "100%"
                      }}
                      
                      src={course.img} alt="image-courses"/>
                   </div>

                  <div 
                      className="course_decs p-[1rem] h-[140px]"
                      style={{
                         backgroundColor: "#00000008",
                         borderBottomLeftRadius: "15px",
                        borderBottomRightRadius: "15px",

                      }}    
                  >
                      <li className="font-semibold mb-1" key={course.id}>{course.courseName}</li>
                      <li className="font-normal mb-1 text-red-500">{"Price : "} {course.price}</li>
                      <div className="footer_course flex justify-between">
                        <li className="font-normal">{course.author}</li>
                        <li className="font-normal">{<i className="fa-solid fa-clock-rotate-left"></i>}{" "}{course.duration}</li>
                      </div>
                  </div>
                 </div>
                  
              ))}
            </ul>   
          </>  
        )}

          </>
        ) : (
          <div className="roadmap_overview-container ">
            {RoadmapCard.map((roadmap) => (
              <div key={roadmap.id} className="roadmap_overview-card">
                <div className="roadmap_card-content">
                  <div className="content_flex-left">
                    <h2 className="roadmap_overview-card-title">{roadmap.title}</h2>
                    <p className="roadmap_overview-card-desc">
                      {roadmap.description}
                    </p>
                  </div>
                  <div className="img_flex-right">
                    <img src={roadmap.image} alt="roadmap-image" />
                  </div>
                </div>
                <div className="roadmap_tech-container">
                  {roadmap.techs?.map((tech) => (
                    <div key={tech.id} className="roadmap_tech-item">
                      <img src={tech.icon} alt={tech.name} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <p>Start roadmap test to know your roadmap...</p>
          </div>
        )}
      </div>

      <Footer />
    </React.Fragment>
  );
};

export default RoadmapTesting;
