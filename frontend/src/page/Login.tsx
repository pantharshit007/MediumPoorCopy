import LoginForm from "../components/LoginForm";
import Quote from "../components/Quote";

function Login() {
  return (
    <>
      <div className="grid lg:grid-cols-2 grid-cols-1 place-items-center h-screen">
        <LoginForm />
        <Quote />
      </div>
    </>
  );
}

export default Login;
