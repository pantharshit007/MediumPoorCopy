import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col gap-y-4 justify-center items-center h-screen">
      Home
      <Link to="/signup">
        <button className="py-1 px-3 bg-indigo-600 text-white text-xl font-mono font-semibold rounded-md">
          Sign Up
        </button>
      </Link>
      <Link to={"/login"}>
        <button className="py-1 px-3 bg-indigo-600 text-white text-xl font-mono font-semibold rounded-md">
          Login
        </button>
      </Link>
    </div>
  );
}

export default Home;
