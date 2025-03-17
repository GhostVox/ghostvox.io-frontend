export const PollForm = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold mb-4">Create Poll</h1>
      <form className="flex flex-col items-center justify-center w-full max-w-md">
        <label className="text-lg font-medium mb-2">Question</label>
        <input
          type="text"
          className="border border-gray-300 rounded-md px-4 py-2 w-full mb-4"
          placeholder="What is your favorite color?"
        />
        <label className="text-lg font-medium mb-2">Options</label>
        <div className="flex flex-col items-center justify-center w-full">
          <input
            type="text"
            className="border border-gray-300 rounded-md px-4 py-2 w-full mb-2"
            placeholder="Option 1"
          />
          <input
            type="text"
            className="border border-gray-300 rounded-md px-4 py-2 w-full mb-2"
            placeholder="Option 2"
          />
          <input
            type="text"
            className="border border-gray-300 rounded-md px-4 py-2 w-full mb-2"
            placeholder="Option 3"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2 w-full mt-4">
          Create Poll
        </button>
      </form>
    </div>
  );
};
