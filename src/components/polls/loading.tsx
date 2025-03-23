export function Loading({ children }: { children: React.ReactNode }) {
  return (
    <div className="col-span-3 text-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mx-auto"></div>
      {children}
    </div>
  );
}
