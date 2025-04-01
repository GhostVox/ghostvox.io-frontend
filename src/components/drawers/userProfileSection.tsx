import { User } from "@/types/user";
import Image from "next/image";
export function UserProfileSection({ user }: { user: User }) {
  return (
    <div className="p-4 mb-6">
      <div className="flex items-center space-x-3 mb-3">
        {user.picture ? (
          <Image
            src={user.picture}
            alt={`"${user.firstName} ${user.lastName}" || "User"`}
            width={40}
            height={40}
            className="rounded-full object-cover w-10 h-10"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center text-white font-semibold">
            {user.firstName?.charAt(0) || "U"}
          </div>
        )}
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white">
            {(user.firstName && user.lastName && `${user.firstName} ${user.lastName}`) ||
              user.firstName ||
              user.lastName ||
              "User"}
          </h3>
          <div className="flex flex-col text-xs">
            <span className="text-gray-500 dark:text-gray-400">{user.email}</span>
            {user.username && (
              <span className="text-purple-600 dark:text-purple-400">@{user.username}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
