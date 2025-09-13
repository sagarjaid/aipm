"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import ClientLayout from "@/components/LayoutClient";
import store from "../store";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  return (
    <ClientLayout>
      <Provider store={store}>{children}</Provider>
    </ClientLayout>
  );
}
