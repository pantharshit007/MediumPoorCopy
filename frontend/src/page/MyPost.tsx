import { useParams } from "react-router-dom";

function MyPost() {
  const { id } = useParams();
  return <>MyPost: {id}</>;
}

export default MyPost;
