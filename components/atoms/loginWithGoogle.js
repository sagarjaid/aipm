import { useState } from "react";
import { useRouter } from "next/router";
import { useLoadUrl } from "@/hooks/useLoadUrl";

const LoginWithGoogle = () => {
  const [user, setUser] = useState();

  const router = useRouter();
  const handleHomePageClik = useLoadUrl();

  let Name;
  let Email;
  let Img;

  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userImg, setUserImg] = useState();

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     Name = window.localStorage.getItem('userName');
  //     setUserName(Name);

  //     Email = window.localStorage.getItem('userEmail');
  //     setUserEmail(Email);
  //     Img = window.localStorage.getItem('userImg');
  //     setUserImg(Img);
  //   }
  // }, [user, Name, Email, Img]);

  const handelScrollDown = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  // const loginwithGoogle = async () => {
  //   const result = await signInWithPopup(auth, provider);
  //   console.log(result?.user, 'Nav User');
  //   setUser(result?.user);

  //   window.localStorage.setItem('userName', `${result.user?.displayName}`);
  //   window.localStorage.setItem('userEmail', `${result.user?.email}`);
  //   window.localStorage.setItem('userImg', `${result.user?.photoURL}`);
  //   window.localStorage.setItem('userUid', `${result.user?.uid}`);

  //   router.push('/auth');
  // };

  return (
    <button
      onClick={() => handleHomePageClik(event)}
      className="flex items-center gap-2 rounded-full border border-gray-700 bg-white py-2.5 pl-6 pr-4 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-1"
    >
      {/* <svg
        className='h-4 w-4'
        viewBox='0 0 19 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M18.9892 10.1871C18.9892 9.36767 18.9246 8.76973 18.7847 8.14966H9.68848V11.848H15.0277C14.9201 12.767 14.3388 14.1512 13.047 15.0812L13.0289 15.205L15.905 17.4969L16.1042 17.5173C17.9342 15.7789 18.9892 13.221 18.9892 10.1871Z'
          fill='#4285F4'
        />
        <path
          d='M9.68813 19.9314C12.3039 19.9314 14.4999 19.0455 16.1039 17.5174L13.0467 15.0813C12.2286 15.6682 11.1306 16.0779 9.68813 16.0779C7.12612 16.0779 4.95165 14.3395 4.17651 11.9366L4.06289 11.9465L1.07231 14.3273L1.0332 14.4391C2.62638 17.6946 5.89889 19.9314 9.68813 19.9314Z'
          fill='#34A853'
        />
        <path
          d='M4.17667 11.9366C3.97215 11.3165 3.85378 10.6521 3.85378 9.96562C3.85378 9.27905 3.97215 8.6147 4.16591 7.99463L4.1605 7.86257L1.13246 5.44363L1.03339 5.49211C0.37677 6.84302 0 8.36005 0 9.96562C0 11.5712 0.37677 13.0881 1.03339 14.4391L4.17667 11.9366Z'
          fill='#FBBC05'
        />
        <path
          d='M9.68807 3.85336C11.5073 3.85336 12.7344 4.66168 13.4342 5.33718L16.1684 2.59107C14.4892 0.985496 12.3039 0 9.68807 0C5.89885 0 2.62637 2.23672 1.0332 5.49214L4.16573 7.99466C4.95162 5.59183 7.12608 3.85336 9.68807 3.85336Z'
          fill='#EB4335'
        />
      </svg> */}
      <span className="text-sm font-medium text-gray-700">
        Practice Now for FREE
      </span>
      <svg
        className="h-4 w-4"
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
    </button>
  );
};

export default LoginWithGoogle;
