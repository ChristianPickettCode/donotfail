import Link from "next/link";
import { Button } from "./ui/button";

export function AboutUs() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Donotfail.ai</h2>
          <p className="text-gray-500 md:text-xl/relaxed dark:text-gray-400">
            Donotfail.ai generates detailed notes from your slides. Our assistant answers questions about the content
            through text or voice.
          </p>
          <Link href="/gallery">
            <Button className="mt-2">Explore</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
