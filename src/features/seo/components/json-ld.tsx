import { serializeJsonLd, type JsonLdObject } from "@/features/seo/structured-data";

// A native <script>, not next/script: structured data isn't executable code.
export function JsonLd({ data }: { data: JsonLdObject | JsonLdObject[] }) {
  const items = Array.isArray(data) ? data : [data];

  return items.map((item, index) => (
    <script
      key={`${item["@type"]}-${index}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(item) }}
    />
  ));
}
