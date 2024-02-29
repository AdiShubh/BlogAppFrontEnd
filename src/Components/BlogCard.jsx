import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Box, IconButton } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
//import useLoginStore from "../State/state";

import { Link, useNavigate } from "react-router-dom";

const BlogCard = ({ title, description, image, username, id, isUser }) => {
  //const isLogin = useLoginStore((state) => state.loginStatus);
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/blog-update/${id}`);
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3000/api/v1/blog/delete-blog/${id}`
      );
      if (data?.success) {
        toast("Blog Deleted");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="  lg:w-[21%] h-250 m-4  border  rounded-lg overflow-hidden shadow-lg ">
      {isUser && (
        <Box display={"flex"}>
          <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
            <ModeEditIcon color="info" />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      )}
      <Link to={`/blog-details/${id}`}>
        <img src={image} className=" w-full h-52  object-fill" />
        <section className="px-6 py-4 ">
          <h2 className="font-medium text-2xl text-indigo-400  h-10  line-clamp-1 leading-normal">
            {title}
          </h2>
          <p className="text-gray-500 text-sm max-h-24 h-24 line-clamp-5">
            {description}
          </p>
        </section>
        <section className="flex justify-between bg-gray-100 py-4 px-4">
          <span className="flex"> Author : {username}</span>
        </section>
      </Link>
    </div>
  );
};

export default BlogCard;
