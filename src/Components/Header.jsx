import React from "react";
import { Link } from "react-router-dom";
import useLoginStore from "../State/state";
import { MdLibraryBooks } from "react-icons/md";

const Header = () => {
  const isLogin = useLoginStore((state) => state.loginStatus);
  const setLoginStatus = useLoginStore((state) => state.setLoginStatus);

  const handleLogout = () => {
    localStorage.setItem("userId", "");
    localStorage.setItem("userName", "");
    setLoginStatus(false);
  };

  return (
    <div className="flex flex-row justify-between bg-indigo-300 p-6  ">
      <p className="text-4xl font-bold text-pink-600 ml-12 flex">
        <MdLibraryBooks className="mr-3" />
        <Link to="/">Bloggies</Link>
      </p>
      {isLogin && (
        <>
          <div className="w-80 flex flex-row justify-around text-2xl text-pink-600">
            <p className="border-b-2  border-pink-700">
              <Link to="/UserBlogs">My BLogs</Link>
            </p>
            <p className="border-b-2 border-pink-700">
              <Link to="/CreateBlog">Create Blogs</Link>
            </p>
          </div>
        </>
      )}
      <ul className="w-60 flex flex-row justify-around text-xl text-pink-600">
        {isLogin && (
          <li>
            <Link to="/Blogs" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        )}
        {!isLogin && (
          <>
            <li>
              <Link to="/Login">Login</Link>
            </li>
            <li>
              <Link to="/Register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Header;
