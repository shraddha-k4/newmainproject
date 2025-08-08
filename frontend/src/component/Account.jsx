import React, { useState } from "react";
import LoginForm from "./LoginForm.jsx";
import SignupForm from "./SignupForm.jsx";



const Account = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        {/* Render Login or Signup Form */}
        {isLogin ? <LoginForm /> : <SignupForm/>}

        {/* Toggle Button */}
        <div className="text-center mt-6">
          <button
            className="text-sm text-blue-600 hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Log In"}
          </button>
        </div>
      </div>
     
    </div>
  );
};

export default Account;
