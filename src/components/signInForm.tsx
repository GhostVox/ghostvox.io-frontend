"use client";
import { FormInput } from "@/components/ui/formInput";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { parseToken } from "@/utils/parseToken";
import { GithubLoginButton } from "@/components/buttons/githubLogin";
import { GoogleLoginButton } from "@/components/buttons/googleLogin";

type FormFields = {
  email: string;
  password: string;
};

type FormErrors = {
  [K in keyof FormFields]: string | null;
};

export const SignInForm = () => {
  const router = useRouter();
  const { setUser } = useAuth();

  const [formData, setFormData] = useState<FormFields>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    email: null,
    password: null,
  });

  const [classic, setClassic] = useState(false);
  const toggleClassic = () => {
    setClassic(!classic);
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Fixed error clearing
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
    let hasErrors = false;
    const newErrors: FormErrors = { email: null, password: null };

    if (!formData.email) {
      newErrors.email = "Email is required";
      hasErrors = true;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      // Direct API call to your Go backend
      const response = await fetch("https://localhost:8080/api/v1/auth/login", {
        method: "POST",
        credentials: "include", // Important for cookies
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        if (data.errors) {
          // Handle specific error messages from backend
          if (data.errors.email) {
            setErrors((prev) => ({ ...prev, email: data.errors.email }));
          } else if (data.errors.password) {
            setErrors((prev) => ({ ...prev, password: data.errors.password }));
          } else {
            // General error
            setErrors({
              email: "Invalid credentials",
              password: "Invalid credentials",
            });
          }
          setIsLoading(false);
          return;
        }
      }

      // Extract any tokens from headers if needed (for your frontend auth state)
      const authHeader = response.headers.get("Authorization");
      const token = authHeader ? authHeader.split(" ")[1] : null;

      if (token) {
        // Update your auth context/state
        const user = await parseToken(token);
        setUser(user);
      }

      // Successful login, redirect
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setErrors({
        email: "An error occurred during sign in",
        password: null,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-8">
      <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="pt-4 px-4 mb-0 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text">
          <button className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
            <Link href="/" >
              <span className="sr-only">Close</span>❌
            </Link>
          </button>
        </div>

        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign In</h2>

          {!classic ? (
            <div className="space-y-3 mb-6">
              <GoogleLoginButton />

              <GithubLoginButton />

              <div className="relative flex items-center justify-center my-6">
                <div className="absolute w-full border-t border-gray-300"></div>
                <div className="relative bg-white px-4 text-sm text-gray-500">Or</div>
              </div>

              <button
                onClick={toggleClassic}
                className="w-full flex items-center justify-center gap-3 px-4 py-2 bg-indigo-600 rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Sign in with Email
              </button>
            </div>
          ) : (
            <div className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <FormInput
                  name="email"
                  label="Email"
                  inputType="email"
                  value={formData.email}
                  error={errors.email}
                  onChange={handleChange}
                />

                <FormInput
                  name="password"
                  label="Password"
                  inputType="password"
                  value={formData.password}
                  error={errors.password}
                  onChange={handleChange}
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:bg-indigo-400"
                  >
                    {isLoading ? "Signing in..." : "Sign in"}
                  </button>
                </div>
              </form>

              <div className="mt-6">
                <button
                  onClick={toggleClassic}
                  className="w-full text-center text-sm text-indigo-600 hover:text-indigo-500"
                >
                  ← Back to sign-in options
                </button>
              </div>

              <div className="mt-6 text-center text-sm">
                <span className="text-gray-600">Don&apos;t have an account? </span>
                <Link href="/sign-up" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Sign up
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div >
  );
};
