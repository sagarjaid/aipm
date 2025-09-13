// import { usePageReload } from '@/hooks/usePageReload';

const QuestionControls = ({
  handleNextQuestion,
  currentQuestionIndex,
  totalQuestions,
  handleResult,
  loadingResult,
}) => {
  // const reloadPage = usePageReload();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 text-sm">
      {currentQuestionIndex < totalQuestions ? (
        <div
          className="w-36 cursor-pointer rounded-md border border-gray-700 bg-white px-3.5 py-1.5 text-center shadow-sm hover:bg-slate-100"
          onClick={handleNextQuestion}
        >
          Next Question
        </div>
      ) : loadingResult ? (
        <div>redirecting to the results page...</div>
      ) : (
        <div
          onClick={handleResult}
          href="/dash"
          className="w-fit cursor-pointer rounded-md border border-green-600 bg-green-200 px-3.5 py-1.5 text-center shadow-sm hover:bg-green-300"
        >
          End the Interview and get Result
        </div>
      )}
    </div>
  );
};

export default QuestionControls;
