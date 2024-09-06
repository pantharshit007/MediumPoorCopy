import NewStory from "../components/NewStory";

function UpdateBlog() {
  const status: "new" | "edit" = "edit";
  return (
    <>
      <div>
        <p>New update to the Story?</p>
        <div>
          <NewStory status={status} />
        </div>
      </div>
    </>
  );
}

export default UpdateBlog;
