import Link from "next/link";
import ButtonSupport from "@/components/ButtonSupport";

// Simple 404 page with a button to go home and a button to contact support
// Show a cute SVG with your primary color
export default function Custom404() {
  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center gap-8 bg-base-100 p-10 text-base-content">
      <div className="text-7xl">404</div>
      <p className="text-lg font-semibold md:text-xl">
        This page doesn&apos;t exist 🧐
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <Link href="/" className="btn btn-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
              clipRule="evenodd"
            />
          </svg>
          Home
        </Link>

        <ButtonSupport />
      </div>
    </section>
  );
}
