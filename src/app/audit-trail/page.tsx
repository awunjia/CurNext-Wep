import {
  PlaceholderPage,
  buildPlaceholderMetadata,
} from "@/components/placeholder-page";

export const metadata = buildPlaceholderMetadata(
  "Audit Trail",
  "Audit logging and activity history",
);

export default function Page() {
  return (
    <PlaceholderPage
      title="Audit Trail"
      description="Audit logging and activity history"
    />
  );
}
