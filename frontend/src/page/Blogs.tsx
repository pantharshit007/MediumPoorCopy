import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { getAllBlogs } from "../services/backendCall";
import { Blog } from "../utils/Types";

function Blogs() {
  const [blogData, setBlogData] = useState<Blog[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const token = localStorage.getItem("token") ?? "";
  async function getBlogs() {
    setLoading(true);
    const res = await getAllBlogs(token);
    if (!res) {
      setLoading(false);
      return;
    }
    setBlogData(res.data.blogs);
    setLoading(false);
  }

  useEffect(() => {
    getBlogs();
  }, []);

  if (loading) {
    return (
      <div className="grid place-items-center min-h-[calc(100vh-3.5rem)]">
        <div className="loader" />
      </div>
    );
  }

  return (
    <>
      <div className="md:w-[70%] w-[95%] mx-auto">
        {blogData && blogData.length > 0 ? (
          blogData.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              title={blog.title}
              content={blog.content}
              authorName={blog.author.name}
              publishedDate="05 September 2024"
            />
          ))
        ) : (
          <div className="grid h-screen place-items-center">
            No Blogs Available!
          </div>
        )}
      </div>
    </>
  );
}

export default Blogs;
