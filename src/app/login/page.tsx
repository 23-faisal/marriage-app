"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser } from "@/service/authService";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type LoginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  // const onSubmit = async (data: LoginForm) => {
  //   setLoading(true);
  //   try {
  //     const res = await loginUser(data);
  //     console.log("Login response:", res);

  //     if (res?.status) {
  //       toast.success(res.message || "Login successful");

  //       // ✅ Save token in localStorage for client-side use
  //       if (res.token) {
  //         console.log(res.token);
  //         localStorage.setItem("accessToken", res.token);
  //         console.log("set localstorage token");
  //       }

  //       // Wait a bit for cookie to be set and then redirect
  //       setTimeout(() => {
  //         // router.push("/user/dashboard");
  //         const redirect = new URLSearchParams(window.location.search).get("redirect");
  //         router.push(redirect || "/user/dashboard");

  //         setLoading(false);
  //       }, 500);
  //     } else {
  //       toast.error(res?.message || "Login failed");
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     toast.error("Login failed. Please try again.");
  //     setLoading(false);
  //   }
  // };


  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    try {
      const res = await loginUser(data);
      console.log("Login response:", res);

      if (res?.status) {
        toast.success(res.message || "Login successful");

        if (res.token) {
          localStorage.setItem("accessToken", res.token);
          localStorage.setItem("userData", JSON.stringify(res.data));
        }

        // Determine redirect target
        const searchParams = new URLSearchParams(window.location.search);
        const redirect = searchParams.get("redirect");

        // Delay for smoother UX
        setTimeout(() => {
          router.push(redirect || "/user/dashboard");
        }, 300);
      } else {
        toast.error(res?.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link
            href="/"
            className="flex items-center justify-center space-x-2 mb-6"
          >
            <img
              src="/logo.png" // **<-- REPLACE WITH YOUR ACTUAL IMAGE PATH**
              alt="ShaadiMart Logo"
              className="w-25 h-25 object-contain" // Ensures the image fits well
            />
            <span className="text-3xl font-bold mr-6 text-gray-900">
              ShaadiMart BD
            </span>
          </Link>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email */}
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email",
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm ml-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-500"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm ml-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>

              {/* Forgot password */}
              <div className="text-center">
                <Button variant="link" className="text-sm text-gray-600">
                  Forgot your password?
                </Button>
              </div>
            </form>

            {/* Sign up link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                {/* <Link
                  href="/register"
                  className="text-rose-500 hover:text-rose-600 font-medium"
                >
                  Sign up
                </Link> */}
              <Link
                href={`/register${typeof window !== "undefined" && window.location.search ? window.location.search : ""}`}
                className="text-rose-500 hover:text-rose-600 font-medium"
              >
                Sign up
              </Link>

              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
