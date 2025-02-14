import { signupInput } from "@chill_guy_sameer/medium-common";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<signupInput>({
    name: "",
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/${
          type === "signup" ? "signup" : "signin"
        }`,
        postInputs
      );
      const jwt = response.data.jwt;
      console.log(jwt);
      localStorage.setItem("token", jwt);
      navigate("/");
      toast.success("Login successfully");
    } catch (error) {
      toast.error("Input is incorrect");
      console.log(error);
    }
  }

  return (
    <div className=" h-screen flex justify-center flex-col">
      <div className="flex justify-center flex-col items-center ">
        <div className="text-3xl font-bold">Create an account</div>
        <div className="text-slate-400 ">
          {type === "signin"
            ? "Don't have an account ?"
            : "Already have an account?"}
          <Link
            className="pl-3 underline text-blue-600"
            to={type === "signin" ? "/signup" : "/signin"}
          >
            {type === "signin" ? "signup" : "signin"}
          </Link>

          <div className="mt-10 ">
            {type === "signup" ? (
              <LabelledInput
                label="Name"
                placeholder="Enter your name"
                onChange={(e) => {
                  setPostInputs({ ...postInputs, name: e.target.value });
                }}
              />
            ) : null}

            <LabelledInput
              label="Email"
              placeholder="Enter your email"
              onChange={(e) => {
                setPostInputs({ ...postInputs, username: e.target.value });
              }}
            />
            <LabelledInput
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              onChange={(e) => {
                setPostInputs({ ...postInputs, password: e.target.value });
              }}
              onToggle={() => setShowPassword(!showPassword)}
              isPasswordVisible={showPassword}
            />
          </div>
          <button
            type="button"
            onClick={sendRequest}
            className="text-white w-full mt-4 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            {type === "signup" ? "signup" : "signin"}
          </button>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onToggle?: () => void;
  isPasswordVisible?: boolean;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
  onToggle,
  isPasswordVisible,
}: LabelledInputType) {
  return (
    <div className="mt-4">
      <label className="block mb-2 text-sm font-semibold text-black">
        {label}
      </label>
      <div className="relative">
        <input
          onChange={onChange}
          type={type || "text"}
          id={label}
          className="block w-full px-3 py-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500"
          placeholder={placeholder}
          required
        />
        {type === "password" || type === "text" ? (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault(); // Prevent default behavior to avoid losing focus
              onToggle?.();
            }}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
          >
            {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        ) : null}
      </div>
    </div>
  );
}
