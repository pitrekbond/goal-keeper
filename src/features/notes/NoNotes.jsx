export default function NoNotes({ isDarkMode }) {
  return (
    <div className="flex justify-center items-center pt-[45.5px] w-full">
      <span
        className={`text-center ${
          isDarkMode ? "bg-dark-800 text-white" : "bg-gray-100 text-gray-700"
        } text-lg font-semibold  p-20 rounded-md shadow-md border border-gray-400 w-full m-4`}
      >
        You haven't added any notes yet
      </span>
    </div>
  );
}
