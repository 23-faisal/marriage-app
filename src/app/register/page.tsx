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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SignUpUser } from "@/service/authService";
import { Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

type FormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  account_created_by: string;
  phone_number: string;
};

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const res = await SignUpUser(data);
      
      // Check if user was created successfully regardless of success flag
      if (res.success || res.message?.includes("successfully") || res.user) {
        toast.success("Registration successful! Redirecting to login...", {
          duration: 3000,
        });
        
        const redirect = searchParams?.get("redirect");
        const loginRedirect = redirect
          ? `/login?redirect=${encodeURIComponent(redirect)}`
          : "/login";

        setTimeout(() => {
          router.push(loginRedirect);
        }, 1500);
      } else {
        // Handle different error scenarios
        const errorMessage = res.message || "Registration failed. Please try again.";
        
        if (res.message?.includes("email") || res.message?.includes("Email")) {
          toast.error("This email is already registered. Please use a different email or login.");
        } else if (res.message?.includes("phone") || res.message?.includes("Phone")) {
          toast.error("This phone number is already registered. Please use a different phone number.");
        } else {
          toast.error(errorMessage);
        }
      }
    } catch (err: any) {
      console.error("Registration error:", err);
      
      // Handle specific success case where API might throw error but user is created
      if (err.message?.includes("successfully") || err.response?.data?.message?.includes("successfully")) {
        toast.success("Registration successful! Redirecting to login...", {
          duration: 3000,
        });
        
        setTimeout(() => {
          router.push("/login");
        }, 1500);
        return;
      }
      
      // Handle other errors
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else if (err.message?.includes("Network")) {
        toast.error("Network error. Please check your connection and try again.");
      } else {
        toast.error("Something went wrong during registration. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const [redirectQuery, setRedirectQuery] = useState("");
  useEffect(() => {
    setRedirectQuery(typeof window !== "undefined" ? window.location.search : "");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center -mb-3">
          <Link
            href="/"
            className="flex items-center justify-center space-x-2 mb-6"
          >
            <img
              src="/logo.png"
              alt="ShaadiMart BD Logo"
              className="w-25 h-25 object-contain"
            />
            <span className="text-3xl font-bold mr-12 text-gray-900">
              ShaadiMart BD
            </span>
          </Link>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create Account</CardTitle>
            <CardDescription>
              Join ShaadiMart BD to find your perfect match
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-1">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    className="pl-10"
                    {...register("name", { 
                      required: "Full name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters"
                      }
                    })}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm ml-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

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
                        message: "Enter a valid email address",
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

              {/* Profile Created By */}
              <div className="space-y-1">
                <Label>Profile Created By</Label>
                <Controller
                  name="account_created_by"
                  control={control}
                  rules={{ required: "Please select who is creating this profile" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select who is creating this profile" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="self">Self</SelectItem>
                        <SelectItem value="parent">Parent</SelectItem>
                        <SelectItem value="sibling">Sibling</SelectItem>
                        <SelectItem value="relative">Relative</SelectItem>
                        <SelectItem value="friend">Friend</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.account_created_by && (
                  <p className="text-red-500 text-sm ml-1">
                    {errors.account_created_by.message}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div className="space-y-1">
                <Label htmlFor="phone_number">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone_number"
                    type="text"
                    placeholder="Enter your phone number"
                    className="pl-10"
                    {...register("phone_number", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9]{10,15}$/,
                        message: "Enter a valid phone number (10-15 digits)",
                      },
                    })}
                  />
                </div>
                {errors.phone_number && (
                  <p className="text-red-500 text-sm ml-1">
                    {errors.phone_number.message}
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
                    placeholder="Create a password"
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
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
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

              {/* Confirm Password */}
              <div className="space-y-1">
                <Label htmlFor="password_confirmation">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password_confirmation"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="pl-10 pr-10"
                    {...register("password_confirmation", {
                      required: "Please confirm your password",
                      validate: (val) =>
                        val === watch("password") || "Passwords do not match",
                    })}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password_confirmation && (
                  <p className="text-red-500 text-sm ml-1">
                    {errors.password_confirmation.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href={`/login${redirectQuery}`}
                  className="text-rose-500 hover:text-rose-600 font-medium"
                >
                  Login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading registration form...</p>
        </div>
      </div>
    }>
      <RegisterForm />
    </Suspense>
  );
}