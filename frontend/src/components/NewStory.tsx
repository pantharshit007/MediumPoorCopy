import { useEffect, useRef, useState } from "react";
import { useDraft, usePublish } from "../store/store";
import { createBlog, updateBlog } from "../services/backendCall";
import { useNavigate, useParams } from "react-router-dom";

interface Status {
  status: "new" | "edit";
}

function NewStory({ status }: Status) {
  const [input, setInput] = useState<string | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);
  const navigate = useNavigate();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { id } = useParams();

  const story = { title: input ?? "", content: content ?? "" };
  const token = localStorage.getItem("token") ?? "";

  async function createStory() {
    setLoading(true);
    const res = await createBlog(token, story);
    if (!res) {
      setLoading(false);
      return;
    }

    const blogId = res.data.postId;
    navigate("/blog/" + blogId);
    return;
  }

  async function updateStory(){
    setLoading(true);
    const res = await updateBlog(token, story, id??"")
    if (!res) {
      setLoading(false);
      return;
    }

    const blogId = res.data.blogId;
    navigate("/blog/" + blogId);
    return;
  }

  const isPublishReady = usePublish((state) => state.publishReady);
  const publishNotAllowed = usePublish((state) => state.updatePublish);

  // Handle publish logic on publishReady:createBlog
  useEffect(() => {
    if (!isPublishReady || status === "edit") return;
    createStory();
    publishNotAllowed(); // Reset publish flag
  }, [isPublishReady]);

  // Load old draft data in edit mode
  const oldData = useDraft((state) => state.blogDraft);
  useEffect(() => {
    if (status === "edit" && oldData) {
      setInput(oldData.title ?? "");
      setContent(oldData.content ?? "");
    }
  }, [status, oldData]);

    // Handle publish logic on publishReady:updateBlog
  useEffect(() => {
    if (!isPublishReady || status === "new") return;
    updateStory();
    publishNotAllowed(); // Reset publish flag
  }, [isPublishReady]);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height first
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 10}px`;      // Set height based on scrollHeight
    }
  };

  // Adjust height on change
  useEffect(() => {
    adjustHeight();
  }, [content]);

  if (loading) {
    return (
      <div className="grid place-items-center min-h-[calc(100vh-3.5rem)]">
        <div className="loader" />
      </div>
    );
  }

  return (
    <>
      <div className="max-w-[1000px] mx-auto">
        <div className="px-3 py-2">
          <input
            type="text"
            value={input ?? ""}
            placeholder="Title"
            onChange={(e) => setInput(e.target.value)}
            className="outline-none h-14 w-full placeholder:font-thin text-3xl font-serif px-3 py-1 border-l-[3px]"
          />
        </div>
        <div className="px-3 py-2">
          <textarea
            ref={textareaRef}
            name="content"
            value={content ?? ""}
            placeholder="Tell Your Story..."
            onChange={(e) => setContent(e.target.value)}
            className="outline-none h-14 w-full placeholder:font-thin text-2xl my-auto px-3 py-1 max-h-[300px] min-h-[100px] "
          />
        </div>
      </div>
    </>
  );
}

export default NewStory;
