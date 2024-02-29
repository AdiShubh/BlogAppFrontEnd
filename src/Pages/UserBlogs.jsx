import { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../Components/BlogCard";
import { BASE_URL } from "../Utils/helper";

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  async function getUserBlogs() {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/blog/user-blog/${localStorage.getItem("userId")}`
      );
      if (data?.success) {
        setBlogs(data?.userBlogs?.blogs);
        //console.log(data?.userBlogs.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserBlogs();
  }, []);

  return (
    <div className="flex flex-row flex-wrap mx-auto w-[88%] mt-8">
      {blogs &&
        blogs.map((blog, index) => (
          <BlogCard
            key={index}
            id={blog?._id}
            isUser={true}
            title={blog?.title}
            description={blog?.description}
            image={blog?.image}
            username={localStorage.getItem("userName")}
            time={blog.createdAt}
          />
        ))}
    </div>
  );
};

export default UserBlogs;
