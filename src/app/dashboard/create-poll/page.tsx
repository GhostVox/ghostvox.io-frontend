"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FormInput } from "@/components/formInput";
import { categories } from "@/state/pollState";
import { useAuth } from "@/context/AuthContext";
import { Plus, Minus, Tag, Clock } from "lucide-react";

type PollOption = {
  id: number;
  name: string;
};

type FormData = {
  title: string;
  category: string;
  expiresAt: number | string;
  options: PollOption[];
  description: string;
  userID: string;
};

type FormErrors = {
  title?: string | null;
  category?: string | null;
  expiresAt?: string | null;
  options?: string | null;
  description?: string | null;
};

export default function CreatePollForm() {
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    category: "",
    expiresAt: 7,
    options: [
      { id: 1, name: "" },
      { id: 2, name: "" },
    ],
    description: "",
    userID: user?.id || "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleOptionChange = (id: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      options: prev.options.map((option) =>
        option.id === id ? { ...option, name: value } : option,
      ),
    }));

    if (errors.options) {
      setErrors((prev) => ({ ...prev, options: null }));
    }
  };

  const addOption = () => {
    const newId =
      formData.options.length > 0 ? Math.max(...formData.options.map((o) => o.id)) + 1 : 1;

    setFormData((prev) => ({
      ...prev,
      options: [...prev.options, { id: newId, name: "" }],
    }));
  };

  const removeOption = (id: number) => {
    if (formData.options.length <= 2) {
      setErrors((prev) => ({
        ...prev,
        options: "A poll must have at least 2 options",
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      options: prev.options.filter((option) => option.id !== id),
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.title.trim()) {
      newErrors.title = "Poll question is required";
      isValid = false;
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
      isValid = false;
    }

    if (formData.expiresAt < 1) {
      newErrors.expiresAt = "Duration must be at least 1 day";
      isValid = false;
    }

    if (formData.options.length < 2) {
      newErrors.options = "A poll must have at least 2 options";
      isValid = false;
    }

    if (formData.options.some((option) => !option.name.trim())) {
      newErrors.options = "All options must have text";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      formData.expiresAt = formData.expiresAt.toString();
      const response = await fetch(`${baseUrl}/polls`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log("Poll created:", formData);
      if (!response.ok) {
        throw new Error("Failed to create poll");
      }
      // Redirect to the dashboard or polls page
      router.push("/dashboard");
    } catch (error) {
      console.error("Error creating poll:", error);
      setErrors((prev) => ({
        ...prev,
        question: "Failed to create poll. Please try again.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <Card>
        <CardHeader className="bg-gradient-to-r from-purple-700 to-blue-700 text-white">
          <CardTitle className="text-2xl">Create a New Poll</CardTitle>
          <p className="text-white/80 mt-2">
            Ask the community what they think and gather insights
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Poll Question */}
            <FormInput
              name="title"
              inputType="text"
              label="Poll Question"
              className="text-white"
              value={formData.title}
              error={errors.title || null}
              onChange={handleInputChange}
            />

            {/* Category and Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-white mb-1">
                  <span className="flex items-center">
                    <Tag className="h-4 w-4 mr-1" />
                    Category
                  </span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <div className="mt-1 text-sm text-red-600">{errors.category}</div>
                )}
              </div>

              <div>
                <FormInput
                  name="expiresAt"
                  inputType="number"
                  label={
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Duration (days)
                    </span>
                  }
                  className="text-white"
                  value={formData.expiresAt.toString()}
                  error={errors.expiresAt || null}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Poll Options */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-white">Poll Options</label>
                <button
                  type="button"
                  onClick={addOption}
                  className="inline-flex items-center text-sm text-purple-600 hover:text-purple-700"
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Option
                </button>
              </div>

              <div className="space-y-3">
                {formData.options.map((option) => (
                  <div key={option.id} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={option.name}
                      onChange={(e) => handleOptionChange(option.id, e.target.value)}
                      placeholder={`Option ${option.id}`}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeOption(option.id)}
                      className="p-2 text-gray-500 hover:text-red-500 focus:outline-none"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              {errors.options && <div className="mt-1 text-sm text-red-600">{errors.options}</div>}
            </div>

            {/* Poll Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-white mb-1">
                Description (Optional)
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Add context or additional information about your poll"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isLoading ? "Creating..." : "Create Poll"}
              </button>

              <Link href="/dashboard" className="flex-1">
                <button
                  type="button"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
