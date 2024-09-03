import Quote from "../components/Quote";
import SignupForm from "../components/SignupForm";

function Signup() {
  return (
    <>
      <div className="flex bg-red-300 gap-x-2 h-screen justify-center items-center">
        <SignupForm />
        <Quote />
      </div>
    </>
  );
}

export default Signup;
