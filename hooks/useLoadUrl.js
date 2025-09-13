import { useRouter } from "next/router";

export const useLoadUrl = () => {
  const router = useRouter();

  const handleHomePageClik = (event) => {
    event.stopPropagation();
    event.preventDefault();
    router.push("/interview/1q39813");
  };

  return handleHomePageClik;
};
