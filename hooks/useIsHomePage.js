import { useRouter } from "next/router";

export const useIsHomePage = () => {
  const router = useRouter();
  return router.pathname === "/";
};
