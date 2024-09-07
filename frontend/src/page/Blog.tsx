import { Outlet } from "react-router-dom";

function Blog() {
  return (
    <div className="h-[calc(100vh-3.5rem)] flex-1">
      <div className="mx-auto w-11/12 max-w-[1100px] h-screen py-10 ">
        <Outlet />
      </div>
    </div>
  );
}

export default Blog;
