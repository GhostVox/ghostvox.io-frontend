export default function PrimaryButton({ text, action, children }: { text: string; action?: () => void, children?: React.ReactNode }) {
  return (
    <button
      onClick={action}
      className="relative inline-flex items-center justify-center px-5 py-2.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 dark:text-white bg-white dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-600 transition-all duration-300 ease-in-out focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 group"
    >
      {/* Gradient overlay that appears on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-500 opacity-100 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>

      {/* Always visible text that changes color on hover */}
      <span className="relative z-10 group-hover:text-white transition-colors duration-300">
        {text} {children}
      </span>

    </button>
  );
}
