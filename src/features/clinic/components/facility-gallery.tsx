import Image from "next/image";

import type { FacilityPhotoContent } from "@/features/clinic/content";
import { cn } from "@/lib/utils";

// One facility photograph, the proof half of a split row. The caption sits
// under the image rather than on a gradient over it.
export function FacilityPhoto({ photo, className }: { photo: FacilityPhotoContent; className?: string }) {
  return (
    <figure className={cn("flex flex-col gap-3", className)}>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-surface-low">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 1280px) 720px, (min-width: 1024px) 58vw, calc(100vw - 2.5rem)"
          className="object-cover"
        />
      </div>
      <figcaption className="text-body-sm text-muted-foreground">
        <span className="text-foreground">{photo.title}</span>, {photo.subtitle.toLowerCase()}
      </figcaption>
    </figure>
  );
}
