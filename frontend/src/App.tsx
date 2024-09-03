import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./page/signup";
import Login from "./page/login";
import Blog from "./page/Blog";
import Blogs from "./page/Blogs";
import MyPost from "./page/MyPost";
import DeleteBlog from "./page/DeleteBlog";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route element={<Blog />}>
          {/* <Route path="blog/new-story" element={<NewStory />} /> */}
          {/* <Route path="/blog/update/:id" element={<UpdateBlog />} /> */}
          {/* <Route path="/blog/:id" element={<Post />} /> */}
          <Route path="/blog/all" element={<Blogs />} />
          <Route path="/blog/@me/:id" element={<MyPost />} />
          <Route path="/blog/delete/:id" element={<DeleteBlog />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
