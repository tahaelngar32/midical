import Link from "next/link";

function NotFound() {
  return (
    <main className="text-center space-y-6 mt-4">
      <h1 className="text-3xl font-semibold">
        This page could not be found :(
      </h1>
      <Link
        href="/"
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
      >
        Go back home
      </Link>
      <Link
        href="/notifications"
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
      >
        notifications
      </Link>
      <Link
        href="/appointments"
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
      >
        appointments
      </Link>
      <Link
        href="/patients"
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
      >
        patients
      </Link>
    </main>
  );
}

export default NotFound;
