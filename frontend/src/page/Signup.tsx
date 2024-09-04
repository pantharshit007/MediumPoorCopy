import Quote from "../components/Quote";
import SignupForm from "../components/SignupForm";

function Signup() {
  return (
    <>
      <div className="grid lg:grid-cols-2 grid-cols-1 place-items-center h-screen">
        <SignupForm />
        <Quote />
      </div>
    </>
  );
}

export default Signup;
