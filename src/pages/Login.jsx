import React, { useState, useContext } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { AuthContext } from "../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { signIn, googleLogin, createUser, updateUserProfile } = useContext(AuthContext);
  const [signUp, setSignUp] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const navigate = useNavigate();  // Use navigate for redirect

  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

    signIn(email, password)
      .then(() => {
        toast.success("Successfully logged in");
        navigate('/');  // Redirect after successful login
      })
      .catch(() => {
        toast.warning("Invalid Credentials");
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    const name = form.get("name");
    const photo = form.get("photo");
    const rePassword = form.get("rePassword");
    const acceptTerms = form.get("acceptTerms");

    if (password !== rePassword) {
      toast.warning("Passwords do not match");
      return;
    }

    if (!acceptTerms) {
      toast.warning("You must accept the terms of service");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error('Password must be at least 6 characters and contain at least one uppercase and one lowercase letter.');
      return;
    }

    createUser(email, password)
      .then(() => {
        updateUserProfile(name, photo)
          .then(() => {
            toast.success('Registered Successfully');
            navigate('/');  // Redirect after successful registration
          })
          .catch(() => {
            toast.error('Failed to update profile');
          });
      })
      .catch(() => {
        toast.error('Failed to register');
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">{signUp ? "Create Account" : "Sign in"}</h2>

        {!signUp && (
          <>
            <div className="flex justify-around items-center my-4">
              <button
                onClick={() => googleLogin()
                  .then(() => {
                    toast.success("Successfully logged in");
                    navigate('/');  // Redirect after successful Google login
                  })
                  .catch(() => toast.error("Google login failed"))
                }
                className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-md w-full justify-center"
              >
                <FcGoogle className="text-2xl" />
                <span className="text-lg font-semibold">Google</span>
              </button>
            </div>
            <p className="text-center text-gray-500 mb-4">Or Continue with Email</p>
          </>
        )}

        <form onSubmit={signUp ? handleRegister : handleLogin} className="space-y-4">
          {signUp && (
            <>
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="input input-bordered w-full"
                required
              />
              <label className="label">
                <span className="label-text">Profile Photo URL</span>
              </label>
              <input
                type="text"
                name="photo"
                placeholder="Profile Photo URL"
                className="input input-bordered w-full"
              />
            </>
          )}
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="input input-bordered w-full"
            required
          />
          <div className="relative">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type={visible ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              required
            />
            {visible ? (
              <IoEyeOutline
                onClick={() => setVisible(!visible)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              />
            ) : (
              <IoEyeOffOutline
                onClick={() => setVisible(!visible)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              />
            )}
          </div>

          {signUp && (
            <div className="relative">
              <label className="label">
                <span className="label-text">Re-type Password</span>
              </label>
              <input
                type={visible2 ? "text" : "password"}
                name="rePassword"
                placeholder="Re-type your password"
                className="input input-bordered w-full"
                required
              />
              {visible2 ? (
                <IoEyeOutline
                  onClick={() => setVisible2(!visible2)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                />
              ) : (
                <IoEyeOffOutline
                  onClick={() => setVisible2(!visible2)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                />
              )}
            </div>
          )}

          {signUp ? (
            <div className="flex gap-2 items-center">
              <input type="checkbox" name="acceptTerms" className="checkbox" required />
              <p className="text-sm">Accept Terms of Service</p>
            </div>
          ) : (
            <div className="flex justify-between">
              <div className="flex gap-2 items-center">
                <input type="checkbox" className="checkbox" />
                <p className="text-sm">Remember me</p>
              </div>
              <p className="text-sm text-blue-600 cursor-pointer">Forgot Password?</p>
            </div>
          )}

          <button type="submit" className="btn w-full bg-blue-600 text-white">
            {signUp ? "Sign up" : "Sign in"}
          </button>
        </form>

        <p className="text-center mt-4">
          {signUp ? "Already have an account?" : "Don't have an account?"}
          <button
            onClick={() => setSignUp(!signUp)}
            className="text-blue-600 underline ml-1"
          >
            {signUp ? "Log in" : "Create Account"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
