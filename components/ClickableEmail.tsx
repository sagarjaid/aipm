"use client";

import React from "react";
import { Copy, Mail } from "lucide-react";
import toast from "react-hot-toast";

interface ClickableEmailProps {
  email: string;
  className?: string;
  showIcon?: boolean;
}

const ClickableEmail: React.FC<ClickableEmailProps> = ({
  email,
  className = "",
  showIcon = true,
}) => {
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      toast.success("Email copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy email");
    }
  };

  return (
    <button
      onClick={handleCopyEmail}
      className={`flex items-center gap-2 whitespace-nowrap transition-colors hover:underline ${className}`}
      title="Click to copy email"
    >
      {showIcon && <Mail className="h-4 w-4" />}
      <span>Email</span>
      <Copy className="h-3 w-3 opacity-40 transition-opacity hover:opacity-60" />
    </button>
  );
};

export default ClickableEmail;
