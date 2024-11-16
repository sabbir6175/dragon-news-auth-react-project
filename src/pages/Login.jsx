import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Login = () => {
  const {userLogin, setUser} = useContext(AuthContext)
  const [error, setError] = useState({})
  const location = useLocation()
  // console.log(location)
  const navigate = useNavigate()
  const handleSubmit =(e)=>{
      e.preventDefault()
      const form = e.target;
      const email = form.email.value;
      const password =form.password.value;
      // console.log({email, password})
      userLogin(email, password)
        .then(result =>{
          const user = result.user;
          // console.log(user)
           setUser(user)
           navigate(location?.state ? location.state : "/");
        })
        .catch(error=>{
     
          setError(error)
        })
  }
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="card bg-base-100 w-full max-w-lg">

         <h2 className="text-center font-bold text-3xl py-5">Login your account</h2>
        <form onSubmit={handleSubmit} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email address</span>
            </label>
            <input
            name="email"
              type="email"
              placeholder="Enter your email address"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
            name="password"
              type="password"
              placeholder="Enter your password"
              className="input input-bordered"
              required
            />
            {
              error &&  <label className="label">
              <a  className="text-red-500">
                {error.message}
              </a>
            </label>
            }
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn text-white bg-[#403F3F]">Login</button>
          </div>
        </form>
        <h2 className="text-lg text-center py-4">Dont’t Have An Account ? <Link className="text-red-400" to={'/auth/register'}>Register</Link> </h2>
      </div>
    </div>
  );
};

export default Login;
