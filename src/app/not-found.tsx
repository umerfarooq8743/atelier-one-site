import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden pt-40 pb-32 text-center">
      <div aria-hidden className="bg-grid mask-radial absolute inset-0 -z-10" />
      <div className="container-page">
        <p className="eyebrow justify-center">404</p>
        <h1 className="display-lg mt-4">This page has come unstitched.</h1>
        <p className="lead mx-auto mt-5 max-w-xl">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/" arrow>Back to home</Button>
          <Button href="/modules" variant="secondary">Explore modules</Button>
        </div>
      </div>
    </section>
  );
}
