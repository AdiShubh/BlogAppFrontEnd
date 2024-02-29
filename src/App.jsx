import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Blogs from "./Pages/Blogs";
import UserBlogs from "./Pages/UserBlogs";
import Header from "./Components/Header";
import CreateBlog from "./Pages/CreateBlog";
import BlogDetail from "./Pages/BlogDetail";
import UpdateBlog from "./Pages/UpdateBlog";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Header />
      <Toaster />

      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/login" element={<Login />} />

        <Route path="/Register" element={<Register />} />

        <Route path="/Blogs" element={<Blogs />} />
        <Route path="/UserBlogs" element={<UserBlogs />} />
        <Route path="/CreateBlog" element={<CreateBlog />} />
        <Route path="/blog-details/:id" element={<BlogDetail />} />
        <Route path="/blog-update/:id" element={<UpdateBlog />} />
      </Routes>
    </>
  );
}

export default App;
