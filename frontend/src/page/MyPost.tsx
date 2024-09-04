import { useLocation } from "react-router-dom";

function MyPost() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  return <>MyPost: {id}</>;
}

export default MyPost;
