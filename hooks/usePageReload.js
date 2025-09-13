import { useRouter } from "next/navigation";

export const usePageReload = () => {
  const router = useRouter();

  const reloadPage = () => {
    router.refresh(); // Use refresh instead of reload for App Router
  };

  return reloadPage;
};
