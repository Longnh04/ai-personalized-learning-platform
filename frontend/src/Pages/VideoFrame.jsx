import React, { useState } from "react";
import "../styles/Pages/VideoFrame.css";
import { CourseVideos, CoursesList } from "../data/courses/CoursesList";

function VideoFrame() {
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const handleCourseClick = (id) => {
    setSelectedCourseId(id);
  };

  return (
    <div className="coursesplaylist_container">
      <section className="section_flex">
        {/* Video Container */}
        <div className="video_container_flex-left">
          {CourseVideos.map((video) => (
            <React.Fragment key={video.id}>
              <iframe
                width="100%"
                height="75%"
                src={video.coursevideo}
                title={video.coursetitle}
                className="course_video"
                controls
              ></iframe>
            </React.Fragment>
          ))}
        </div>

        {/* Video List */}
        <div className="video_list_container_flex-right">
          <div className="course_list-title">
            <h1 className="title">All of course list</h1>
          </div>
          <hr />
          {CoursesList.map((course) => (
            <React.Fragment key={course.id}>
              <ul className="courses_list">
                <li
                  className={`course_item_container ${
                    selectedCourseId === course.id ? "selected" : ""
                  }`}
                  onClick={() => handleCourseClick(course.id)}
                >
                  <div className="video_desc_flex-left">
                    <div className="flex_top">
                      <span className="video_id">{course.id}</span>
                      <p className="video_title">{course.videotitle}</p>
                    </div>
                    <div className="flex_bottom">
                      <i className="fa-solid fa-circle-play"></i>
                      <span>{course.time}</span>
                    </div>
                  </div>

                  {/* Icon Active */}
                  <div className="video_comp_flex-right">
                    <div className="icon_active">
                      <i className="fa-solid fa-circle-check"></i>
                    </div>
                  </div>
                </li>
              </ul>
            </React.Fragment>
          ))}
        </div>
      </section>
    </div>
  );
}

export default VideoFrame;
