const FileInput = () => {
  const handleClick = (event) => {
    event.target.nextElementSibling.click();
  };

  return (
    <div className="flex items-center justify-center w-full rounded-lg border-gray-300">
      <button className="text-blue-500 hover:text-blue-600 font-semibold" onClick={handleClick}>
        Browse
      </button>
      <input
        type="file"
        className="hidden"
        accept="image/*"
        onChange={(event) => {
          // Handle file selection here
        }}
      />
    </div>
  );
};

export default FileInput;
