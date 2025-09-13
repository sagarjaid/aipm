import Image from "next/image";

const ToggleSection = ({
  title,
  content,
  isToggled,
  onToggle,
  handleTextToSpeech,
  isSpeaking,
  setToggle,
  lastToggle,
}) => {
  const handleToggleTextToSpeech = (content, event) => {
    event.stopPropagation();
    handleTextToSpeech(content);
    setToggle(true);
  };

  console.log(isToggled, "isToggled");

  const handleToggle = () => {
    onToggle();
    if (!isToggled && !isSpeaking) {
      handleTextToSpeech(content);
    }
  };
  return (
    <div
      onClick={handleToggle}
      className={`items-top flex cursor-pointer justify-between border-b bg-gray-50 p-4 text-sm ${
        lastToggle ? "rounded-lg" : "rounded-none"
      }`}
    >
      <div className="flex max-w-[80%] flex-col gap-3">
        <div>{title}</div>
        {isToggled && <div className="text-xs text-gray-600">{content}</div>}
      </div>
      <div className="flex flex-col items-center justify-start gap-1">
        <div>
          <Image
            alt="up arrow"
            src={isToggled ? "/up-arrow.svg" : "/down-arrow.svg"}
            width={25}
            height={25}
          />
        </div>
        {isToggled && (
          <div
            onClick={(event) =>
              !isSpeaking && handleToggleTextToSpeech(content, event)
            }
            className={`${
              isSpeaking ? "cursor-not-allowed" : "cursor-pointer"
            } mt-1 w-fit`}
          >
            {isSpeaking ? (
              <Image alt="wave" src="/wave-2.gif" width={22} height={22} />
            ) : (
              <Image
                alt="speaker on"
                src="/speaker-on.svg"
                width={22}
                height={22}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ToggleSection;
