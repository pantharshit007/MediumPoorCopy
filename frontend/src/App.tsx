import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./page/Home";
import Signup from "./page/Signup";
import Login from "./page/Login";
import Blog from "./page/Blog";
import Blogs from "./page/Blogs";
import MyPost from "./page/MyPost";
import Post from "./components/Post";
import NavBar from "./components/NavBar";
import CreateBlog from "./page/CreateBlog";
import UpdateBlog from "./page/UpdateBlog";

function App() {
  return (
    <>
      <div className="w-screen min-h-screen">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route element={<Blog />}>
            <Route path="blog/new-story" element={<CreateBlog />} />
            <Route path="/blog/update/:id" element={<UpdateBlog />} />
            <Route path="/blog/:id" element={<Post />} />
            <Route path="/blog/all" element={<Blogs />} />
            <Route path="/blog/@me" element={<MyPost />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
