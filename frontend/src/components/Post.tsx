import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBlog } from "../services/backendCall";
import { Blog } from "../utils/Types";
import { Avatar } from "./BlogCard";

function Post() {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);
  const { id } = useParams();
  const token = localStorage.getItem("token") ?? "";

  const PublishedDate = "05 Sep 2024";

  async function getSpecifiBlog() {
    setLoading(true);
    const res = await getBlog(token, id ?? "");
    if (!res) {
      setLoading(false);
    }
    setBlog(res?.data.blog);
    setLoading(false);
  }

  useEffect(() => {
    getSpecifiBlog();
    setLoading(true);
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
      {blog ? (
        <div className="flex justify-between max-md:flex-col-reverse w-full max-md:gap-y-4 my-3">
          {/* LEFT SECTION */}
          <div className="flex flex-col md:w-[70%] gap-y-2 px-4 ">
            <p className="font-extrabold text-[2.3rem] font-serif leading-[1.2em] capitalize">
              {blog.title}
            </p>
            <p className="capitalize font-semibold text-lg text-indigo-600">
              Published on {PublishedDate}
            </p>
            <p className="font-normal text-[1.1rem]">{blog.content}</p>
          </div>

          {/* RIGHT SECTION */}
          <div className="md:w-[30%] ">
            <p className="font-normal text-xl my-2">Author</p>
            <Link to={"/blog/@me?id=" + blog.author.id}>
              <div className="flex items-cente gap-x-3">
                <span>
                  <Avatar name={blog.author.name} size="big" />
                </span>
                <div className="flex flex-col">
                  <p className="font-semibold font-serif text-2xl capitalize underline">
                    {blog.author.name}
                  </p>
                  <p>
                    Master in Computer Science, awarded by Science Foundation
                    for amazing research in new gen AI discovery.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <div>No Blog Found</div>
      )}
    </>
  );
}

export default Post;
