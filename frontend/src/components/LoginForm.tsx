import { ChangeEvent, FormEvent, useState } from "react";
import LabelledInput from "./LabelledInput";
import { LoginInput } from "@jethiya007/mediumcopy-common";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/backendCall";

function LoginForm() {
  const navigate = useNavigate();
  const [loginInput, setloginInput] = useState<LoginInput>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [showDemo, setShowDemo] = useState(true);

  function setPassword(e: ChangeEvent<HTMLInputElement>) {
    setloginInput((c) => ({ ...c, password: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (loginInput.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError(null);
    const res = await login(loginInput);
    if (!res?.data) {
      return;
    }

    const jwt = res?.data?.token;
    const userData = JSON.stringify(res?.data?.userDetails);

    localStorage.setItem("token", jwt);
    localStorage.setItem("userData", userData);
    navigate("/blog/all");
  }

  return (
    <>
      {/* TEST ID's */}
      <div
        className={`${showDemo ? "" : "hidden"} 
          justify-center items-center absolute bg-slate-300 top-52 md:top-32 md:right-[50%] right-[10%] p-6 -rotate-[20deg] z-20 rounded-md max-md:hidden`}
      >
        <div className="flex flex-col gap-2 relative">
          {/* PIN */}
          <div
            onClick={() => {
              setShowDemo(false);
            }}
            className="absolute top-[-28px] right-[-27px] text-5xl text-indigo-500 rounded-full w-[40px] h-[40px] flex justify-center items-center cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              width="20"
              height="20"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="#888888"
                stroke="#000000"
                strokeWidth="2"
              />
              <circle cx="50" cy="50" r="20" fill="#ffffff" />
            </svg>
          </div>

          <div className=" gap-y-2 flex flex-col">
            <p className="text-2xl font-extrabold text-richblack-5 flex items-center">
              Try Demo &nbsp;
              <p>⚡</p>
            </p>

            <div>
              <button
                onClick={() => {
                  setloginInput({
                    email: "random@gmail.com",
                    password: "123456",
                  });
                  handleSubmit;
                  setShowDemo(false);
                }}
                className="bg-indigo-500 font-medium font-mono mt-4 mb-1 text-richblack-25 px-4 py-2 rounded-md flex"
              >
                🚀 Click for Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className=" w-full h-full flex flex-col justify-center items-center gap-y-8">
        <div>
          <p className="font-bold font-serif text-4xl">Login to your account</p>
          <p className="text-md mt-1 mx-auto w-fit text-slate-500">
            Create an account? &nbsp;
            <span className="underline">
              <Link to="/signup">Signup</Link>
            </span>
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-y-3 max-2xl:w-[370px] w-[420px]"
        >
          <LabelledInput
            label="Email"
            placeholder="random123@gmail.com"
            type="email"
            value={loginInput.email ?? ""}
            onChange={(e) =>
              setloginInput({ ...loginInput, email: e.target.value })
            }
          />
          <LabelledInput
            label="Password"
            placeholder="123456"
            type="password"
            value={loginInput.password ?? ""}
            onChange={(e) => setPassword(e)}
          />
          {/* Display error message */}
          {error && <p className="text-red-500 -mt-2 text-sm">{error}</p>}

          <button className="bg-gray-950 text-white w-full mx-auto py-2 rounded-md mt-1">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
