import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

function NavBar() {
  const [showModal, setShowModal] = useState(false);
  const [isLoggin, setIsLoggin] = useState(false);
  const navigate = useNavigate();
  const userDetail = localStorage.getItem("userData");
  // @ts-ignore
  const name = userDetail?.name ?? "Jethiya";

  const location = useLocation();
  const onCreateBlog = location.pathname === "/blog/new-story";
  const onUpdateBlog = location.pathname.startsWith("/blog/update");

  useEffect(() => {
    const val = localStorage.getItem("token");
    setIsLoggin(val !== null);
  }, [showModal]);

  function logout() {
    if (!isLoggin) {
      navigate("/signup");
      return;
    }

    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    toast.success("Logout Success!");
    navigate("/login");
    return;
  }

  return (
    <>
      <div className="h-12 bg-slate-100">
        <div className="w-11/12 max-w-maxContent mx-auto h-full flex items-center justify-between">
          <div>
            <Link to={"/"}>
              <p className="text-3xl font-semibold font-serif">Medium</p>
            </Link>
          </div>

          <div className="flex items-center gap-x-6">
            <Link to={"blog/new-story"}>
              <button className="py-1 px-2 rounded-lg bg-green-400 font-medium font-mono shadow-md">
                {onCreateBlog ? (
                  <p>🚀 Publish</p>
                ) : onUpdateBlog ? (
                  <p>🛠️ Update</p>
                ) : (
                  <p>✏️ New-Story</p>
                )}
              </button>
            </Link>

            <div className="relative">
              <span onClick={() => setShowModal(!showModal)}>
                <Avatar name={name} />
              </span>

              <div
                className={`absolute h-min min-w-min py-2 px-3 bg-indigo-500 text-white top-12 right-4 border-2 border-pay-light rounded-md shadow-lg hover:bg-indigo-600 
                ${!showModal ? "hidden" : "block"}`}
              >
                <button className="font-semibold italic w-20" onClick={logout}>
                  {isLoggin ? "Logout →" : "SignUp →"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
