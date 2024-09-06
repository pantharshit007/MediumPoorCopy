import { useLocation } from "react-router-dom";
import { userBlog } from "../services/backendCall";
import { useEffect, useState } from "react";
import { Blog } from "../utils/Types";
import BlogCard from "../components/BlogCard";

function MyPost() {
  const [blogData, setBlogData] = useState<Blog[] | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get("id") ?? "";
  const token = localStorage.getItem("token") ?? "";
  const param = { id: id };

  async function getAllMyPost() {
    setLoading(true);
    const res = await userBlog(token, param);
    if (!res) {
      setLoading(false);
      return;
    }
    setBlogData(res.data.blogs);
    setLoading(false);
  }

  useEffect(() => {
    getAllMyPost();
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
              updateAvailable={true}
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

export default MyPost;
