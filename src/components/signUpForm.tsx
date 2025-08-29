"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { parseToken } from "@/utils/parseToken";
import { GithubLoginButton } from "./buttons/githubLogin";
import { GoogleLoginButton } from "./buttons/googleLogin";
import { FormInput } from "@/components/ui/formInput";
import { CloseButton } from "./buttons/closeButton";

type FormFields = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type FormErrors = {
  [K in keyof FormFields]?: string | null;
};

export default function SignUpForm() {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const { setUser } = useAuth();

  const [formData, setFormData] = useState<FormFields>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    const fieldName = name as keyof FormErrors;
    if (errors[fieldName]) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: null,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    // Validate form
    const newErrors: FormErrors = {};
    let hasErrors = false;

    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
      hasErrors = true;
    }

    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
      hasErrors = true;
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
      hasErrors = true;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      hasErrors = true;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      hasErrors = true;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      hasErrors = true;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${baseURL}/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        if (data.error) {
          // Handle specific error messages from backend
          if (data.error.includes("email")) {
            setErrors((prev) => ({ ...prev, email: data.error }));
          } else if (data.error.includes("password")) {
            setErrors((prev) => ({ ...prev, password: data.error }));
          } else {
            // General error
            setErrors((prev) => ({ ...prev, email: data.error }));
          }
          setIsLoading(false);
          return;
        }
      }

      // Extract token from headers
      const authHeader = response.headers.get("Authorization");
      const token = authHeader ? authHeader.split(" ")[1] : null;

      if (token) {
        // Update your auth context/state
        const user = await parseToken(token);
        setUser(user);
      }

      // Successful signup, redirect to username setup instead of dashboard
      router.push("/setup-username");
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({
        email: "An error occurred during registration",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <CloseButton />
      <div className="p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Account</h2>

        {/* Social Sign-up Options */}
        <div className="space-y-3 mb-6">
          <GoogleLoginButton />
          <GithubLoginButton />
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              name="firstName"
              label="First name"
              inputType="text"
              value={formData.firstName}
              error={errors.firstName || null}
              onChange={handleChange}
            />

            <FormInput
              name="lastName"
              label="Last name"
              inputType="text"
              value={formData.lastName}
              error={errors.lastName || null}
              onChange={handleChange}
            />
          </div>

          <FormInput
            name="email"
            label="Email"
            inputType="email"
            value={formData.email}
            error={errors.email || null}
            onChange={handleChange}
          />

          <FormInput
            name="password"
            label="Password"
            inputType="password"
            value={formData.password}
            error={errors.password || null}
            onChange={handleChange}
          />

          <FormInput
            name="confirmPassword"
            label="Confirm Password"
            inputType="password"
            value={formData.confirmPassword}
            error={errors.confirmPassword || null}
            onChange={handleChange}
          />

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:bg-indigo-400"
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
