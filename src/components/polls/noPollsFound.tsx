export function NoPollsFound({ children }: { children?: React.ReactNode }) {
  return (
    <div className="col-span-3 text-center py-12">
      <div className="text-gray-400 text-5xl mb-4">🔍</div>
      <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
        No polls found
      </h3>
      {children ? (
        children
      ) : (
        <p className="text-gray-500 dark:text-gray-400">
          Try adjusting your search or filter criteria
        </p>
      )}
    </div>
  );
}
