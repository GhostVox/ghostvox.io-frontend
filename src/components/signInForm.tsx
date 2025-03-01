"use client";
import { FormState } from "@/actions/createUser";
import { useActionState } from "react";
import { classicSignIn } from "@/actions/classicLogin";
import Link from "next/link";
import { useState } from "react";

export const SignInForm = () => {
  const initialState: FormState = {
    errors: {},
  };
  const [classic, setClassic] = useState(false);
  const [state, formAction] = useActionState(classicSignIn, initialState);

  const toggleClassic = () => {
    setClassic(!classic);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="pt-4 px-4 mb-0">
        <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
          <span className="sr-only">Close</span>❌
        </Link>
      </div>

      <div className="p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign In</h2>

        {!classic ? (
          <div className="space-y-3 mb-6">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                <path
                  fill="#4285F4"
                  d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866.549 3.921 1.453l2.814-2.814C17.503 2.988 15.139 2 12.545 2 7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z"
                />
                <path
                  fill="#34A853"
                  d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866.549 3.921 1.453l2.814-2.814C17.503 2.988 15.139 2 12.545 2 7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z"
                />
                <path
                  fill="#FBBC05"
                  d="M7.545 14.327c-.468-1.395-.468-2.9 0-4.294l-3.116-2.411c-1.434 2.489-1.434 5.478 0 7.967l3.116-1.262z"
                />
                <path
                  fill="#EA4335"
                  d="M12.545 7.968c1.447 0 2.735.499 3.759 1.472l2.673-2.673c-2.2-2.057-5.082-3.313-8.432-3.313-5.524 0-10.002 4.477-10.002 10 0 2.224.729 4.295 1.965 5.947l3.126-2.427c-.599-1.066-.933-2.273-.933-3.52 0-3.997 3.25-7.234 7.844-7.234z"
                />
              </svg>
              Sign in with Google
            </button>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                <path
                  fill="#24292E"
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.09.682-.217.682-.48 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.841-2.337 4.687-4.565 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.48A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z"
                />
              </svg>
              Sign in with GitHub
            </button>

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
            <form action={formAction} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
                {state?.errors?.email && (
                  <p className="mt-1 text-sm text-red-600">{state.errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
                {state?.errors?.password && (
                  <p className="mt-1 text-sm text-red-600">{state.errors.password}</p>
                )}
              </div>

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
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  Sign in
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
          </div>
        )}

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-600">Don't have an account? </span>
          <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};
