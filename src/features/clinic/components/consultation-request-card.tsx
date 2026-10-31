import {
  ConsultationForm,
  type ConsultationFormAction,
} from "@/features/clinic/components/consultation-form";
import { consultationForm } from "@/features/clinic/content";
import { cn } from "@/lib/utils";

// The on-site request form (/clinic#request-consultation). "Book consultation"
// links go to SeriousMD instead (site.bookingHref).
export function ConsultationRequestCard({
  action,
  className,
}: {
  action: ConsultationFormAction;
  className?: string;
}) {
  return (
    <section
      id="request-consultation"
      aria-labelledby="request-title"
      className={cn("rounded-2xl bg-surface-low p-6 sm:p-10", className)}
    >
      <div className="mb-8 flex flex-col gap-2">
        <h2 id="request-title" className="text-headline-md text-foreground sm:text-headline-lg">
          {consultationForm.title}
        </h2>
        <p className="max-w-[60ch] text-body-sm text-muted-foreground">{consultationForm.description}</p>
      </div>
      <ConsultationForm action={action} />
    </section>
  );
}
