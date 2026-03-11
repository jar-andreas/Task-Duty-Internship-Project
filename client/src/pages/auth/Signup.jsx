import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { validateSignUpSchema } from "@/utils/dataSchema";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "@/api/auth";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Signup() {
  const navigate = useNavigate();
    const { setAccessToken } = useAuth();
  const [revealPassword, setRevealPassword] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validateSignUpSchema),
  });

  const togglePasswordReveal = (e) => {
    e.preventDefault();
    setRevealPassword((prev) => !prev);
  };

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (res, variables) => {
      toast.success(res.data.message || "Registration Successful");
      setAccessToken(res.data.data);
      navigate("/auth/login", {
        state: {
          username: variables.username,
          password: variables.password,
        },
      });
    },
    onError: (error) => {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data ||
          "Registration failed",
      );
    },
  });

  const onSubmitForm = async (data) => {
    console.log("form data", data);
    mutation.mutate(data);
  };
  return (
    <section className="md:max-w-140 lg:max-w-110 mx-auto min-h-screen flex justify-center items-center">
      <form className="w-full" onSubmit={handleSubmit(onSubmitForm)}>
        <div className="flex flex-col gap-2 ">
          <Link to="/" className="mb-2 flex justify-center items-center">
            <img src="/Group 2.png" alt="logo" />
          </Link>
          <h1 className="text-2xl font-bold">Register</h1>
          <p className="text-lg font-medium text-(--lorem-color)">
            Welcome to your Client Task Manager
          </p>
        </div>
        <div className="flex flex-col gap-3 mt-4 w-full">
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="username" className="text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              placeholder="John Doe"
              {...register("username")}
              className="border border-black outline-none focus:border-(--primary-color) p-2 text-sm rounded placeholder:text-xs"
            />
            <p className="text-red-500 text-xs">{errors.username?.message}</p>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="email" className="text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="you@example.com"
              className="border border-black p-2 text-sm rounded focus:border-(--primary-color) outline-none placeholder:text-xs"
            />
            <p className="text-red-500 text-xs">{errors.email?.message}</p>
          </div>
          <div className="flex flex-col gap-1 w-full relative">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              type={revealPassword ? "text" : "password"}
              {...register("password")}
              placeholder="*************"
              className="border border-black p-2 text-sm rounded focus:border-(--primary-color) outline-none placeholder:text-xs"
            />
            <button
              type="button"
              onClick={togglePasswordReveal}
              className="absolute right-3 top-10.5 -translate-y-1/2 text-black"
            >
              {revealPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            <p className="text-red-500 text-xs">{errors.password?.message}</p>
          </div>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="bg-(--primary-color) text-white text-sm py-2 rounded-lg flex items-center justify-center gap-2"
          >
            {mutation.isPending ? (
              <>
                <Loader className="animate-spin" size={18} />
                Signing Up...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </div>
        <p className="text-center text-sm mt-2">
          Already have an account?
          <Link to="/auth/login" className="text-(--primary-color) font-bold">
            {" "}
            Log in
          </Link>
        </p>
      </form>
    </section>
  );
}
