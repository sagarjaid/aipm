"use client";

import Link from "next/link";
import { CircleChevronRight, CornerRightUp, Zap } from "lucide-react";

interface BookerDemoProps {
  buttonText?: string;
}

export default function BookerDemo({
  buttonText = "BOOK A DEMO",
}: BookerDemoProps) {
  return (
    <Link
      target="_blank"
      href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0dlFbpOGz632w39CFnxBTVwjC_q7qdR3T6WU2aoV9GbJqe7F1v5hsfBq6ldDwWXjc3MPHN8sof"
      className="w-fit rounded-sm border bg-black p-1.5 px-4 text-center text-sm font-bold text-white"
    >
      <div className="flex items-center gap-2">{buttonText}</div>
    </Link>
  );
}
