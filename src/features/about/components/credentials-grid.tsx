import { credentials } from "@/features/about/content";

// Credentials as a definition list inside the long-form profile.
export function CredentialsGrid() {
  return (
    <section aria-labelledby="credentials-title" className="mt-14 flex flex-col gap-5">
      <h2 id="credentials-title" className="text-headline-sm text-foreground">
        Credentials & accreditations
      </h2>
      <dl className="flex flex-col gap-5">
        {credentials.map((item) => (
          <div key={item.title} className="flex flex-col gap-1">
            <dt className="text-title-md font-semibold text-foreground">{item.title}</dt>
            <dd className="text-body-md leading-relaxed text-muted-foreground">
              <span className="text-foreground">{item.category}.</span> {item.description}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
