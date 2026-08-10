import {
  PlaceholderPage,
  buildPlaceholderMetadata,
} from "@/components/placeholder-page";

export const metadata = buildPlaceholderMetadata(
  "Compliance",
  "Compliance certifications and frameworks",
);

export default function Page() {
  return (
    <PlaceholderPage
      title={"Compliance"}
      description={"Compliance certifications and frameworks"}
    />
  );
}
