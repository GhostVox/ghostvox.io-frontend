import Link from "next/link";
export const CloseButton = () => {
  return (
    <div className="pt-4 px-4">
      <Link href="/" className="w-full">
        <button className="relative transition-opacity duration-300 ease-in-out focus:outline-none w-10 h-10 bg-white rounded-full overflow-hidden group flex items-center w-10 h-10 justify-center">
          {/* Gradient overlay that appears on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Always visible content */}
          <span className="relative z-10 text-sm">❌</span>
        </button>
      </Link>
    </div>
  );
}
