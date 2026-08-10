import {
  PlaceholderPage,
  buildPlaceholderMetadata,
} from "@/components/placeholder-page";

export const metadata = buildPlaceholderMetadata(
  "Support",
  "Customer support and assistance",
);

export default function Page() {
  return (
    <PlaceholderPage
      title="Support"
      description="Customer support and assistance"
    />
  );
}
