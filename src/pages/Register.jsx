import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Register = () => {

    const {createNewUser,setUser,updateUserProfile} = useContext(AuthContext)
    const [error, setError]=useState()
    const navigate = useNavigate()
    const handleSubmitFrom =(e)=>{

        e.preventDefault();
        const form = new FormData(e.target)
        const name = form.get('name')
        if(name.length < 5){
          setError('must be more the 6 character longer')
        }
        const photo = form.get('photo')
        const email = form.get('email')
        const password = form.get('password')
        // console.log({name, photo,email,password})
        createNewUser(email, password)
            .then(result => {
                // console.log(result.user)
                const user = result.user;
                // console.log(user)
                setUser(user)
                updateUserProfile({displayName: name,photoURL: photo})
                .then(()=>{
                  navigate('/')
                })
                .catch(error=>{
                  // console.log(error)
                })
            })    
            .catch(error=> {
                
                setError(error.message)
            })
    }


  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="card bg-base-100 w-full max-w-lg">
        <h2 className="text-center font-bold text-3xl py-5">
          Register your account
        </h2>
        <form  onSubmit={handleSubmitFrom} className="card-body">
          {/* name form */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
                name="name"
              type="text"
              placeholder="Enter your Name"
              className="input input-bordered"
              required
            />
          </div>
         
          {/* Photo URL link */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
                name="photo"
              type="text"
              placeholder="Enter your Photo URL link"
              className="input input-bordered"
              required
            />
          </div>
          {/* email form */}
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
          </div>
          {
            error &&  <label className="label">
            <span className="text-red-500">{error}</span>
          </label>
          }
          <div className="form-control">
            <label className="label justify-start gap-3 cursor-pointer ">
              <input type="checkbox" className="checkbox" />
              <span className="label-text">Accept Term & Conditions</span>
            </label>
          </div>
          <div className="form-control mt-6">
            <button  className="btn text-white bg-[#403F3F]">Register</button>
          </div>
        </form>
        <h2 className="text-lg text-center py-4">
          Already have an account ?{" "}
          <Link className="text-red-400" to={"/auth/login"}>
            login
          </Link>{" "}
        </h2>
      </div>
    </div>
  );
};

export default Register;
