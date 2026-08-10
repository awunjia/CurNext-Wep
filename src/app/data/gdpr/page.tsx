import {
  PlaceholderPage,
  buildPlaceholderMetadata,
} from "@/components/placeholder-page";

export const metadata = buildPlaceholderMetadata(
  "GDPR Policies",
  "GDPR policies",
);

export default function Page() {
  return (
    <PlaceholderPage
      title={"GDPR Policies"}
      description={"GDPR policies"}
    />
  );
}
