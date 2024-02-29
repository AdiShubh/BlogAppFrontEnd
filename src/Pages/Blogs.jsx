import React, { useEffect, useState } from "react";
import BlogCard from "../Components/BlogCard";
import axios from "axios";
import { BASE_URL } from "../Utils/helper";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  async function getAllBlogs() {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/blog/all-blogs`);
      if (data?.success) {
        setBlogs(data?.blogs);
        //console.log(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div className="flex flex-row flex-wrap mx-auto w-[88%] mt-8">
      {blogs &&
        blogs.map((blog, index) => (
          <BlogCard
            key={index}
            id={blog?._id}
            isUser={localStorage.getItem("userId") === blog?.user?._id}
            title={blog?.title}
            description={blog?.description}
            image={blog?.image}
            username={blog?.user?.username}
            time={blog.createdAt}
          />
        ))}
    </div>
  );
};

export default Blogs;
