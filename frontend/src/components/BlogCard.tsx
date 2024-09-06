import { Link } from "react-router-dom";
import Blog_img from "../assets/Blog_img.webp";
import { Draft, useDraft } from "../store/store";

interface BlogCardProps {
  id: string;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  updateAvailable?: Boolean;
}

function BlogCard({
  id,
  authorName,
  title,
  content,
  publishedDate,
  updateAvailable = false,
}: BlogCardProps) {
  function truncate(str: string, maxLength: number) {
    return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
  }

  // Zustand hook to update the draft in the store
  const updateDraft = useDraft((state) => state.updateDraft);

  function updateBlog() {
    const oldData: Draft = { title: title, content: content };
    updateDraft(oldData);
  }
  return (
    <Link to={"/blog/" + id}>
      <div className="flex w-full min-h-[230px] justify-center items-center px-3 py-2 gap-x-4 my-3 border-b-2 last-of-type:border-">
        <div className="flex flex-col w-[75%] gap-x-2">
          <div className="flex items-center gap-x-3">
            <Avatar name={authorName} />
            <p className="capitalize font-semibold">{authorName}</p>|
            <p className="capitalize font-normal text-indigo-600">
              {publishedDate}
            </p>
          </div>

          <div className="flex flex-col gap-y-2 mt-3">
            <p className="font-bold font-serif text-2xl">{title}</p>
            <p className="text-lg font-medium font-serif">
              {truncate(content, 100)}
            </p>
          </div>

          <div className="mt-4 flex gap-x-3">
            <p>{`${Math.ceil(content.length / 100)} min read`}</p>
            {updateAvailable && (
              <Link to={"/blog/update/" + id} onClick={updateBlog}>
                <p>✏️</p>
              </Link>
            )}
          </div>
        </div>

        <div className="w-[200px] h-[150px]">
          <img
            src={Blog_img}
            alt="img"
            className=" object-contain rounded-md"
          />
        </div>
      </div>
    </Link>
  );
}

export default BlogCard;

export function Avatar({
  name,
  size = "small",
}: {
  name: string;
  size?: "small" | "big";
}) {
  const imageUrl = `https://api.dicebear.com/8.x/notionists/svg?seed=${name}`;
  return (
    <div
      aria-label={name}
      className={` bg-indigo-400 my-auto border-2 border-gray-900 rounded-full 
      ${size === "small" ? "w-10 h-10" : "w-12 h-12"}`}
    >
      <img src={imageUrl} alt={name} className="rounded-full" />
    </div>
  );
}
