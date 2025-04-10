import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactPlayer from 'react-player';
import "../styles/Pages/VideoWatching.css";

function VideoWatching() {
  const { courseId } = useParams();
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);

  // Theo dõi index của video hiện tại
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);  

  // Theo dõi danh sách các video đã hoàn thành
  const [completedLessons, setCompletedLessons] = useState([]);

  // Theo dõi trạng thái mở rộng của các section
  const [expandedSections, setExpandedSections] = useState({});

  // Theo dõi trạng thái của video player
  const playerRef = useRef(null);

  // call api lấy danh sách video
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`/api/videos/${courseId}`);
        setVideos(response.data);
        if (response.data.length > 0) {
          setCurrentVideo(response.data[0]);
        }
      } catch (error) {
        console.error('Lỗi khi tải danh sách video:', error);
      }
    };
    fetchVideos();
  }, [courseId]);

  const handleEnded = () => {
    setCompletedLessons(prev => [...prev, currentLessonIndex]); // Đánh dấu lesson hiện tại là đã hoàn thành
    if (currentLessonIndex < courseContent.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1); // Chuyển sang lesson tiếp theo
    }
  };

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const courseContent = [
    {
      id: 1,
      title: 'Introduction',
      total: '3/3',
      duration: '07:28',
      lessons: [
        { id: 1, title: 'Lời khuyên trước khóa học', duration: '04:20' },
        { id: 2, title: 'Environment setup', duration: '02:08' },
        { id: 3, title: 'Join the F8 community on Discord', duration: '01:00' },
      ],
    },
    {
      id: 2,
      title: 'Variables, comments, built-in',
      total: '8/10',
      duration: '31:03',
      lessons: [],
    },
    {
      id: 3,
      title: 'Operators, data types',
      total: '0/26',
      duration: '01:51:16',
      lessons: [],
    },
    {
      id: 4,
      title: 'Working with functions',
      total: '0/15',
      duration: '53:57',
      lessons: [],
    },
    {
      id: 5,
      title: 'Working with strings',
      total: '0/6',
      duration: '41:18',
      lessons: [],
    },
  ];

  return (
    <div className="video_watching_wrapper">
      <div className="video_watching_container">
        <div className="video_watching_content h-[450px]">
          {currentVideo ? (
            <ReactPlayer
              ref={playerRef}
              url={currentVideo.videoUrl}
              width="100%"
              height="100%"
              controls
              onEnded={handleEnded}
            />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>

      <div className="course_content_list">
        <h2>Nội dung khóa học</h2>
        {courseContent.map((section) => (
          <div key={section.id} className="course_section">
            <div
              className="section_title"
              onClick={() => toggleSection(section.id)}
            >
              <div className="section_flex_left">
                <span>{section.id}. {section.title}</span>
                <span className='text-sm'>{section.total} <span className='p-1'>|</span> {section.duration}</span>
              </div>
              <span className="arrow">{expandedSections[section.id] ? <i className="fa-solid fa-caret-up"></i> : <i className="fa-solid fa-caret-down"></i>}</span>
            </div>
            {expandedSections[section.id] && (
              <div className="lesson_list">
                {section.lessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className={`lesson_item 
                      ${completedLessons.includes(index) ? 'completed' : ''}
                      ${currentLessonIndex === index ? 'active' : ''}
                    `}
                  >
                    <div className="lession_flex_left">
                        <span>{lesson.id}.{lesson.title}</span>
                        <div className='flex items-center'>
                          <span 
                            style={{
                              fontSize: '12px',
                            }}
                          >
                            <i class="fa-solid fa-clock"></i>
                          </span> 
                          <span className='px-2'>{lesson.duration}</span>
                      </div>
                    </div>
                    <i class="fa-solid fa-circle-check"></i>



                    
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoWatching;
