import { useLoadUrl } from "@/hooks/useLoadUrl";

const Nav = () => {
  const handleHomePageClik = useLoadUrl();

  const handelScrollDown = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <nav className="flex w-full items-center justify-between px-4 py-5">
      <a href="/">
        <img src="/logo-2.svg" className="w-[180px] sd:w-[220px]" />
      </a>
      <div
        onClick={() => handleHomePageClik(event)}
        className="flex cursor-pointer items-center justify-around gap-1 rounded-full bg-gray-800 p-2.5 px-4 text-white"
      >
        <span className="text-xs">Let Get Started</span>
        <svg
          className="w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
          />
        </svg>
      </div>
    </nav>
  );
};

export default Nav;
