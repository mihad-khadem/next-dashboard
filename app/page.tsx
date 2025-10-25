// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-xl text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          Welcome to the Dashboard
        </h1>
        {/* <p className="text-gray-600 text-lg mb-8">
          This is the main landing page of the dashboard application. Navigate
          to the dashboard to view analytics, reports, and more.
        </p> */}
        <Link
          href="/dashboard"
          className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-all duration-200"
        >
          Dashboard
        </Link>
      </div>
    </main>
  );
}
