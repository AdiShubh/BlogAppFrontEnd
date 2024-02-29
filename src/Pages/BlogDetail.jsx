import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import { BASE_URL } from "../Utils/helper";

const BlogDetail = () => {
  const [blog, setBlog] = useState([]);
  const id = useParams().id;

  const getBlogDetail = async (req, res) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/blog/get-blog/${id}`
      );
      if (data.success) {
        setBlog(data?.singleBlog);

        console.log(blog);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogDetail();
  }, [id]);

  return (
    <>
      <Box>
        <Box>
          <img
            src={blog.image}
            alt={blog.title}
            width={"1000px"}
            style={{
              border: "1px solid black",
              borderRadius: "10px",
              margin: "20px auto",
              objectFit: "fill",
            }}
          />
          <Typography variant="h4" margin={"20px"} textAlign={"center"}>
            {blog.title}
          </Typography>
          <Typography variant="h6" padding={"20px"} textjustify={"center"}>
            {blog.description}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default BlogDetail;
