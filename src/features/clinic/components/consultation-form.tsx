"use client";

import { useActionState, useState, useSyncExternalStore } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Building2,
  Calendar,
  CircleAlert,
  CircleCheck,
  Clock,
  LoaderCircle,
  Mail,
  Phone,
  User,
  Video,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/config/site";
import {
  HONEYPOT_FIELD,
  isoDateInTimeZone,
  modalities,
  REASON_MAX_LENGTH,
  timeWindows,
  type ConsultationFormState,
  type FieldName,
  type Modality,
} from "@/features/clinic/consultation-request";
import { consultationForm } from "@/features/clinic/content";
import { cn } from "@/lib/utils";

export type ConsultationFormAction = (
  state: ConsultationFormState,
  formData: FormData,
) => Promise<ConsultationFormState>;

const initialState: ConsultationFormState = { status: "idle" };

const modalityIcons: Record<Modality, LucideIcon> = {
  "in-person": Building2,
  telehealth: Video,
};

// Filled controls from the design: no visible fill change on the card, a
// lighter fill on hover and focus, and a teal focus ring from the primitive
const controlClass =
  "text-body-md placeholder:text-outline md:text-body-md dark:bg-surface-container dark:hover:bg-surface-high/60 dark:focus-visible:bg-surface-high";

const subscribe = () => () => {};

export function ConsultationForm({ action }: { action: ConsultationFormAction }) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const [modality, setModality] = useState<Modality>("in-person");

  // Read on the client only, so the prerendered page stays static
  const today = useSyncExternalStore(
    subscribe,
    () => isoDateInTimeZone(new Date(), site.location.timeZone),
    () => undefined,
  );

  const errors = state.status === "error" ? state.fieldErrors : {};
  const values = state.status === "error" ? state.values : {};
  const fieldProps = (name: FieldName) => ({
    id: name,
    name,
    defaultValue: values[name],
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  return (
    <form action={formAction} noValidate className="relative flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <span id="modality-label" className="text-label-md text-foreground">
          Consultation type
        </span>
        <RadioGroup
          name="modality"
          value={modality}
          onValueChange={(value) => setModality(value as Modality)}
          aria-labelledby="modality-label"
          className="grid grid-cols-2 gap-1 rounded-lg bg-surface-highest p-1"
        >
          {modalities.map((option) => {
            const Icon = modalityIcons[option.value];
            return (
              <Label
                key={option.value}
                className="min-h-10 cursor-pointer justify-center gap-2 rounded-md px-3 py-2 text-label-md whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring has-data-checked:bg-primary has-data-checked:text-primary-foreground motion-reduce:transition-none"
              >
                <RadioGroupItem value={option.value} className="sr-only" />
                <Icon aria-hidden className="size-4.5 shrink-0" />
                {option.label}
              </Label>
            );
          })}
        </RadioGroup>
      </div>

      <Field data-invalid={errors.fullName ? true : undefined}>
        <FieldLabel htmlFor="fullName">
          Full name <RequiredMark />
        </FieldLabel>
        <WithIcon icon={User}>
          <Input
            {...fieldProps("fullName")}
            autoComplete="name"
            placeholder="e.g. Kenneth Sterling"
            required
            className={cn("h-12 pl-11", controlClass)}
          />
        </WithIcon>
        <FieldErrorSlot id="fullName-error" message={errors.fullName} />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field data-invalid={errors.phone ? true : undefined}>
          <FieldLabel htmlFor="phone">
            Phone number <RequiredMark />
          </FieldLabel>
          <WithIcon icon={Phone}>
            <Input
              {...fieldProps("phone")}
              type="tel"
              autoComplete="tel"
              placeholder="+1 (555) 000-0000"
              required
              className={cn("h-12 pl-11", controlClass)}
            />
          </WithIcon>
          <FieldErrorSlot id="phone-error" message={errors.phone} />
        </Field>
        <Field data-invalid={errors.email ? true : undefined}>
          <FieldLabel htmlFor="email">
            Email address <RequiredMark />
          </FieldLabel>
          <WithIcon icon={Mail}>
            <Input
              {...fieldProps("email")}
              type="email"
              autoComplete="email"
              placeholder="kenneth@example.com"
              required
              className={cn("h-12 pl-11", controlClass)}
            />
          </WithIcon>
          <FieldErrorSlot id="email-error" message={errors.email} />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field data-invalid={errors.preferredDate ? true : undefined}>
          <FieldLabel htmlFor="preferredDate">
            Preferred date <RequiredMark />
          </FieldLabel>
          <WithIcon icon={Calendar}>
            <Input
              {...fieldProps("preferredDate")}
              type="date"
              min={today}
              required
              className={cn("h-12 pl-11", controlClass)}
            />
          </WithIcon>
          <FieldErrorSlot id="preferredDate-error" message={errors.preferredDate} />
        </Field>
        <Field data-invalid={errors.timeWindow ? true : undefined}>
          <FieldLabel htmlFor="timeWindow">
            Preferred time window <RequiredMark />
          </FieldLabel>
          <WithIcon icon={Clock}>
            <NativeSelect
              {...fieldProps("timeWindow")}
              defaultValue={values.timeWindow ?? ""}
              required
              className="w-full [&>select]:h-12 [&>select]:pl-11 [&>select]:text-body-md [&>select]:dark:bg-surface-container [&>select]:dark:hover:bg-surface-high/60 [&>select]:dark:focus-visible:bg-surface-high [&>svg]:right-4 [&>svg]:size-5"
            >
              <NativeSelectOption value="" disabled>
                Select time range
              </NativeSelectOption>
              {timeWindows.map((window) => (
                <NativeSelectOption key={window.value} value={window.value}>
                  {window.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </WithIcon>
          <FieldErrorSlot id="timeWindow-error" message={errors.timeWindow} />
        </Field>
      </div>

      <Field data-invalid={errors.reason ? true : undefined}>
        <FieldLabel htmlFor="reason">Reason for visit or diagnosis</FieldLabel>
        <Textarea
          {...fieldProps("reason")}
          rows={3}
          maxLength={REASON_MAX_LENGTH}
          placeholder="Please describe cardiac symptoms, valvular condition, prior bypass records, or required second opinions…"
          className={cn("min-h-24 resize-none p-4", controlClass)}
        />
        <FieldErrorSlot id="reason-error" message={errors.reason} />
      </Field>

      {/* Spam trap: hidden from people and assistive technology */}
      <div aria-hidden className="absolute -left-[10000px] size-px overflow-hidden">
        <label htmlFor={HONEYPOT_FIELD}>Company</label>
        <input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === "error" && (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-lg bg-destructive/10 p-4 text-body-sm text-destructive"
        >
          <CircleAlert aria-hidden className="mt-0.5 size-4.5 shrink-0" />
          {state.message}
        </p>
      )}

      <Button type="submit" size="xl" disabled={pending} className="w-full">
        {pending ? (
          <>
            <LoaderCircle data-icon="inline-start" className="motion-safe:animate-spin" />
            Sending request…
          </>
        ) : (
          <>
            {consultationForm.submitLabel}
            <ArrowRight data-icon="inline-end" />
          </>
        )}
      </Button>

      <div role="status" aria-live="polite">
        {state.status === "success" && (
          <p className="flex items-center gap-2 rounded-lg bg-surface-high p-4 text-body-sm text-foreground">
            <CircleCheck aria-hidden className="size-5.5 shrink-0 text-primary" />
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}

// Reserves one line so an appearing error doesn't push the form down
function FieldErrorSlot({ id, message }: { id: string; message?: string }) {
  return (
    <div className="min-h-5">
      <FieldError id={id}>{message}</FieldError>
    </div>
  );
}

function RequiredMark() {
  return (
    <span aria-hidden className="text-destructive">
      *
    </span>
  );
}

function WithIcon({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (
    <div className="relative">
      <Icon
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-4 z-10 size-5 -translate-y-1/2 text-muted-foreground"
      />
      {children}
    </div>
  );
}
