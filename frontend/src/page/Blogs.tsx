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

        <BlogCard
          id="123"
          authorName="jethiya"
          title="How an ugly ass site makes more than 3000$ per month?"
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem perferendis, quis corrupti deserunt animi possimus eos pariatur vitae tempora odit mollitia reiciendis ipsam. Itaque molestias ullam sequi assumenda, iste amet!
      Dignissimos enim nemo eius ab? Eaque aut ad sint cum magni maiores. Voluptates quam accusantium a? Deserunt soluta, hic exercitationem, repellat minus dignissimos similique illum facere non, quidem eum sequi?"
          publishedDate="05 September 2024"
        />

        <BlogCard
          id="123"
          authorName="jethiya"
          title="How an ugly ass site makes more than 3000$ per month?"
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem perferendis, quis corrupti deserunt animi possimus eos pariatur vitae tempora odit mollitia reiciendis ipsam. Itaque molestias ullam sequi assumenda, iste amet!
      Dignissimos enim nemo eius ab? Eaque aut ad sint cum magni maiores. Voluptates quam accusantium a? Deserunt soluta, hic exercitationem, repellat minus dignissimos similique illum facere non, quidem eum sequi?"
          publishedDate="05 September 2024"
        />

        <BlogCard
          id="123"
          authorName="jethiya"
          title="How an ugly ass site makes more than 3000$ per month?"
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem perferendis, quis corrupti deserunt animi possimus eos pariatur vitae tempora odit mollitia reiciendis ipsam. Itaque molestias ullam sequi assumenda, iste amet!
      Dignissimos enim nemo eius ab? Eaque aut ad sint cum magni maiores. Voluptates quam accusantium a? Deserunt soluta, hic exercitationem, repellat minus dignissimos similique illum facere non, quidem eum sequi?"
          publishedDate="05 September 2024"
        />
      </div>
    </>
  );
}

export default Blogs;
