"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FormInput } from "@/components/ui/formInput";
import ErrorCard from "@/components/cards/errorCard";
import Image from "next/image";
import { User, Upload, Camera } from "lucide-react";
import { AvatarUploadModal } from "@/components/user-profile/avatarUploadModal";

type UserProfileForm = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
};

type FormErrors = {
  firstName?: string | null;
  lastName?: string | null;
  username?: string | null;
  email?: string | null;
  avatar?: string | null;
  general?: string | null;
};

export default function UserProfilePage() {
  const { user, setUser } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);

  const [formData, setFormData] = useState<UserProfileForm>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  });

  // Set initial form data when user data is available
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        username: user.username || "",
        email: user.email || "",
      });
    }
  }, [user]);

  // Handle input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    } else if (!/^[a-zA-Z0-9_-]+$/.test(formData.username)) {
      newErrors.username = "Username can only contain letters, numbers, underscores and hyphens";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle avatar upload
  const handleAvatarUpload = async (file: File) => {
    if (!user) return;

    setAvatarLoading(true);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;

      // Create form data to send the file
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await fetch(`${baseUrl}/users/avatar`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to upload avatar");
      }

      const data = await response.json();

      // Update user context with new avatar URL
      if (data.pictureUrl) {
        setUser({
          ...user,
          picture: data.pictureUrl,
        });
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error uploading avatar:", error);
      setErrors({
        avatar: error instanceof Error ? error.message : "Failed to upload avatar",
      });
    } finally {
      setAvatarLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Using the API URL from environment variables as seen in other components
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(`${baseUrl}/users/profile`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          user_name: formData.username,
          email: formData.email,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update profile");
      }

      // Update the user context with the new data
      if (user) {
        setUser({
          ...user,
          firstName: formData.firstName,
          lastName: formData.lastName,
          username: formData.username,
          email: formData.email,
        });
      }

      // Show success message
      setSuccess(true);

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrors({
        general: error instanceof Error ? error.message : "An error occurred updating your profile",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen p-4">
        <ErrorCard
          title="Not Logged In"
          message="You must be logged in to view your profile"
          onDismiss={() => router.push("/sign-in")}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 pt-16 lg:pt-6 transition-all duration-300">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Your Profile</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          View and update your account information
        </p>
      </div>

      {/* Avatar Upload Modal */}
      <AvatarUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpload={handleAvatarUpload}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile sidebar */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="flex flex-col items-center p-6">
              <div
                className="mb-4 relative group cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                {user.picture ? (
                  <div className="relative">
                    <Image
                      src={user.picture}
                      alt={`${user.firstName} ${user.lastName}`}
                      width={100}
                      height={100}
                      className="rounded-full object-cover w-24 h-24"
                    />
                    <div className="absolute inset-0 rounded-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Camera className="text-white h-8 w-8" />
                    </div>
                  </div>
                ) : (
                  <div className="relative w-24 h-24">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center text-white text-3xl font-semibold">
                      <User size={40} />
                    </div>
                    <div className="absolute inset-0 rounded-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Camera className="text-white h-8 w-8" />
                    </div>
                  </div>
                )}
                {avatarLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  </div>
                )}
              </div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {user.firstName} {user.lastName}
              </h2>
              {user.username && (
                <p className="text-purple-600 dark:text-purple-400 mb-2">@{user.username}</p>
              )}
              <p className="text-gray-600 dark:text-gray-400 text-sm">{user.email}</p>
              <p className="text-gray-500 dark:text-gray-500 text-xs mt-2">
                Role: {user.role || "User"}
              </p>

              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 flex items-center"
              >
                <Upload className="h-4 w-4 mr-1" />
                Change Profile Picture
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Profile form */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="bg-gradient-to-r from-purple-700 to-blue-700 text-white">
              <CardTitle className="text-xl">Edit Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {errors.general && (
                <div className="mb-6">
                  <ErrorCard
                    message={errors.general}
                    onDismiss={() => setErrors({ ...errors, general: null })}
                  />
                </div>
              )}

              {success && (
                <div className="mb-6 p-3 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-md">
                  Your profile has been updated successfully!
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    name="firstName"
                    inputType="text"
                    label="First Name"
                    value={formData.firstName}
                    error={errors.firstName || null}
                    onChange={handleInputChange}
                  />

                  <FormInput
                    name="lastName"
                    inputType="text"
                    label="Last Name"
                    value={formData.lastName}
                    error={errors.lastName || null}
                    onChange={handleInputChange}
                  />
                </div>

                <FormInput
                  name="username"
                  inputType="text"
                  label="Username"
                  value={formData.username}
                  error={errors.username || null}
                  onChange={handleInputChange}
                />

                <FormInput
                  name="email"
                  inputType="email"
                  label="Email"
                  value={formData.email}
                  error={errors.email || null}
                  onChange={handleInputChange}
                />

                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                  >
                    {isLoading ? "Updating..." : "Update Profile"}
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
