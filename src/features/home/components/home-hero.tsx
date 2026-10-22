import Link from "next/link";

import { DoctorPortrait } from "@/components/doctor-portrait";
import { StatusDot } from "@/components/status-dot";
import { TextLink } from "@/components/text-link";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/config/site";
import { hero } from "@/features/home/content";

// H2 split diptych, 7/5: the claim on the left, the portrait as its proof.
export function HomeHero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="grid grid-cols-1 items-center gap-10 pt-6 pb-14 lg:grid-cols-12 lg:gap-16 lg:pt-10 lg:pb-20"
    >
      <div className="flex flex-col items-start gap-6 lg:col-span-7">
        <h1 id="hero-title" className="text-display-lg-mobile text-foreground md:text-display-lg">
          {hero.title}{" "}
          <br className="max-sm:hidden" />
          {hero.titleContinued}
        </h1>
        <p className="max-w-[56ch] text-body-lg text-muted-foreground">{hero.description}</p>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-2">
          <Link href={site.bookingHref} className={buttonVariants({ size: "xl" })}>
            Book consultation
          </Link>
          <TextLink href="/specialties">Explore care specialties</TextLink>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-label-md text-muted-foreground">
          {hero.credentials.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-1.5">
              <Icon aria-hidden className="size-4 text-primary" />
              {label}
            </li>
          ))}
        </ul>
      </div>

      <figure className="flex flex-col gap-4 lg:col-span-5">
        <DoctorPortrait
          sizes="(min-width: 1024px) 40vw, calc(100vw - 2.5rem)"
          preload
          className="aspect-square w-full rounded-2xl"
        />
        <figcaption className="flex items-center gap-2 text-body-sm text-muted-foreground">
          <StatusDot />
          <span>
            <span className="text-foreground">{hero.practice.label}</span>, {hero.practice.location}
          </span>
        </figcaption>
      </figure>
    </section>
  );
}
