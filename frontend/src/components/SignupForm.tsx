import { ChangeEvent, FormEvent, useState } from "react";
import LabelledInput from "./LabelledInput";
import { SignupInput } from "@jethiya007/mediumcopy-common";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../services/backendCall";

function SignupForm() {
  const navigate = useNavigate();
  const [signupInput, setSignupInput] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  function setPassword(e: ChangeEvent<HTMLInputElement>) {
    setSignupInput((c) => ({ ...c, password: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (signupInput.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError(null);
    const res = await signup(signupInput);
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
      <div className=" w-full h-full flex flex-col justify-center items-center gap-y-8">
        <div>
          <p className="font-bold font-serif text-4xl">Create an account</p>
          <p className="text-md mt-1 mx-auto w-fit text-slate-500">
            Already have an account? &nbsp;
            <span className="underline">
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-y-3 max-2xl:w-[370px] w-[420px]"
        >
          <LabelledInput
            label="Username"
            placeholder="Enter your username"
            type="text"
            value={signupInput.name ?? ""}
            onChange={(e) =>
              setSignupInput({ ...signupInput, name: e.target.value })
            }
          />
          <LabelledInput
            label="Email"
            placeholder="random123@gmail.com"
            type="email"
            value={signupInput.email ?? ""}
            onChange={(e) =>
              setSignupInput({ ...signupInput, email: e.target.value })
            }
          />
          <LabelledInput
            label="Password"
            placeholder="123456"
            type="password"
            value={signupInput.password ?? ""}
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

export default SignupForm;
