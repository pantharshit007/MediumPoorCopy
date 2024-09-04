import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./page/Home";
import Signup from "./page/Signup";
import Login from "./page/Login";
import Blog from "./page/Blog";
import Blogs from "./page/Blogs";
import MyPost from "./page/MyPost";
import DeleteBlog from "./page/DeleteBlog";

function App() {
  return (
    <>
      <p>random</p>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route element={<Blog />}>
          {/* <Route path="blog/new-story" element={<NewStory />} /> */}
          {/* <Route path="/blog/update/:id" element={<UpdateBlog />} /> */}
          {/* <Route path="/blog/:id" element={<Post />} /> */}
          <Route path="/blog/all" element={<Blogs />} />
          <Route path="/blog/@me" element={<MyPost />} />
          <Route path="/blog/delete/:id" element={<DeleteBlog />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
