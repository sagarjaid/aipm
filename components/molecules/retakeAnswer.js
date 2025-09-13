import Image from "next/image";

const RetakeAnswer = ({ handleRetake }) => {
  return (
    <div
      onClick={handleRetake}
      className="mt-4 flex cursor-pointer flex-col items-center justify-center gap-1"
    >
      <div className="rounded-full border-2 border-black px-2 pb-2 pt-1.5">
        <Image alt="retake" src="/retake.svg" width={25} height={25} />
      </div>
      <div className="text-xs">retake answer</div>
    </div>
  );
};

export default RetakeAnswer;
