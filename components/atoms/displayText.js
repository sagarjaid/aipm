const DisplayText = ({ text }) => {
  console.log(text, "text");
  return (
    <div
      className="h-24 w-full overflow-hidden rounded-md border p-2 text-xs text-gray-400 sdm:h-52"
      onInput={(e) =>
        console.log("Text inside div", e.currentTarget.textContent)
      }
    >
      {text
        ? text
        : "Use the microphone icon to answer the asked question and your answer will appear here in text format..."}
    </div>
  );
};

export default DisplayText;
