import { hospitalPrivileges } from "@/features/about/content";

export function HospitalPrivileges() {
  return (
    <section aria-labelledby="privileges-title" className="mt-14 flex flex-col gap-5">
      <h2 id="privileges-title" className="text-headline-sm text-foreground">
        Hospital privileges
      </h2>
      <dl className="flex flex-col gap-5">
        {hospitalPrivileges.map((hospital) => (
          <div key={hospital.name} className="flex flex-col gap-1">
            <dt className="text-title-md font-semibold text-foreground">{hospital.name}</dt>
            <dd className="text-body-md text-muted-foreground">
              {hospital.unit}, {hospital.campus}.{" "}
              <span className="text-foreground">{hospital.role}.</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
