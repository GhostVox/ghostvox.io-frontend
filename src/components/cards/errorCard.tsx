import React from "react";
import { XCircle } from "lucide-react";

type ErrorCardProps = {
  title?: string;
  message?: string;
  onDismiss?: () => void;
};

const ErrorCard = ({
  title = "Error",
  message = "An error occurred. Please try again.",
  onDismiss,
}: ErrorCardProps) => {
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden border border-red-200">
      <div className="bg-red-50 px-4 py-2 border-b border-red-100 flex justify-between items-center">
        <div className="flex items-center">
          <XCircle className="h-5 w-5 text-red-500 mr-2" />
          <h3 className="text-red-600 font-medium">{title}</h3>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
            aria-label="Close"
          >
            <span className="text-xl">&times;</span>
          </button>
        )}
      </div>
      <div className="p-4">
        <p className="text-gray-700">{message}</p>
      </div>
      <div className="px-4 py-3 bg-gray-50 flex justify-end">
        <button
          onClick={onDismiss}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};

export default ErrorCard;
