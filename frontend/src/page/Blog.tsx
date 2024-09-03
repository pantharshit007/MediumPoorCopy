import { Outlet } from "react-router-dom";

function Blog() {
  return (
    <div>
      <div className="text-blue-700">Blog!!</div>
      <Outlet />
    </div>
  );
}

export default Blog;
