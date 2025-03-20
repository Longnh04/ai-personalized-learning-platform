import React from "react";
import Footer from '../components/layout/Footer';
import '../styles/Pages/Blog.css';
import { blogPosts } from "../data/pages/BlogData";
import Link from '../data/Link';   

const Blog = () => {
  return (
    <React.Fragment>   
      <div className="blog_container">
        {/* main blog content start here */}
        <div className="blog_container-content-left">
          <h1 className="blog_post-title">Featured Articles</h1>
          <p className="blog_post-desc">
            Collection of articles sharing experiences in self-studying
            programming online, modern web programming techniques, and tips for
            developing skills from basic to advanced, helping you gradually
            conquer the world of technology.
          </p>
          {blogPosts.map((post) => (
            <React.Fragment key={post.id}>
              <div className="postItem">
                <div className="post_author">
                  <img src={post.avatar} alt="author" />
                  <span>{post.authorName}</span>
                </div>

                <div className="post_content-container">
                  <div className="post_content">
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                  </div>

                  <div className="post_img">
                    <img src={post.image} alt="post-image" />
                  </div>
                </div>

                <div className="post_footer">
                  <span>{post.tech}</span>
                  <p>{post.time}</p>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* extra blog content start here */}
        <div className="blog_container-content-right">
          <h1 className="comment_post">OTHER POST FROM DEVNEST</h1>
          {/* Nhúng video */}
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/4RixMPF4xis"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="blog_video"
          ></iframe>

          <p>
            To get the most out of Devnest, you need to be active and participate in the community. 
          </p>
          <a href={Link} onClick={() => alert('Loading...')}>
            Learn more <i className="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Blog;
