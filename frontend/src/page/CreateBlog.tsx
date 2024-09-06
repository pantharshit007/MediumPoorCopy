import NewStory from "../components/NewStory";

function CreateBlog() {
  const status: "new" | "edit" = "new";

  return (
    <>
      <div>
        <p>Create New Story...</p>
        <div>
          <NewStory status={status} />
        </div>
      </div>
    </>
  );
}

export default CreateBlog;
