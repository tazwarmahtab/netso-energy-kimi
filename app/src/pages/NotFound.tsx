import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-cream text-ink">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-24 md:px-10">
        <p className="eyebrow text-gold">404 • Page not found</p>
        <h1 className="font-display mt-5 max-w-3xl text-6xl md:text-8xl">
          This roof does not exist.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/65 md:text-lg">
          The address may be outdated, or the page may not be part of the current Netso site.
          Return to the main story and start from the asset.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-cream transition-transform hover:-translate-y-0.5"
        >
          <ArrowLeft className="h-4 w-4" />
          Return home
        </Link>
      </div>
    </main>
  );
}
