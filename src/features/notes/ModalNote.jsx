export default function ModalNote({ selectedNote, onClose, isDarkMode }) {
  const { title, content: text } = selectedNote;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-10 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className={`${
          isDarkMode ? "bg-dark-800 text-white" : "bg-gray-100"
        }  rounded-md px-6 pb-6 pt-4 border max-[640px]:w-[20rem] w-[30rem] border-gray-400 relative`}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-center font-semibold text-accent-500">{title}</h3>
        <p className="whitespace-pre-wrap">{text}</p>
      </div>
    </div>
  );
}
