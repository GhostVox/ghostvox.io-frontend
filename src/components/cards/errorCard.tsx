import React from "react";
import { XCircle, X } from "lucide-react";

/**
 * Error card component that displays error messages with optional dismiss functionality.
 * 
 * @param title - The error title (defaults to "Error")
 * @param message - The error message (defaults to generic message)
 * @param onDismiss - Optional callback when user dismisses the error
 * 
 * @example
 * ```tsx
 * <ErrorCard 
 *   title="Failed to load polls" 
 *   message={error} 
 *   onDismiss={() => window.location.reload()} 
 * />
 * ```
 */
interface ErrorCardProps {
  title?: string;
  message?: string;
  onDismiss?: () => void;
}

const ErrorCard = ({
  title = "Error",
  message = "An error occurred. Please try again.",
  onDismiss,
}: ErrorCardProps) => {
  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-red-200 dark:border-red-800">
      {/* Header */}
      <div className="bg-red-50 dark:bg-red-900/20 px-4 py-3 border-b border-red-100 dark:border-red-800 flex justify-between items-center">
        <div className="flex items-center">
          <XCircle className="h-5 w-5 text-red-500 mr-2" />
          <h3 className="text-red-600 dark:text-red-400 font-medium">{title}</h3>
        </div>

        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded transition-colors"
            aria-label="Dismiss error"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Message */}
      <div className="p-4">
        <p className="text-gray-700 dark:text-gray-300">{message}</p>
      </div>
    </div>
  );
};

export default ErrorCard;
