import {
  PlaceholderPage,
  buildPlaceholderMetadata,
} from "@/components/placeholder-page";

export const metadata = buildPlaceholderMetadata(
  "Terms of Service",
  "Terms of service",
);

export default function Page() {
  return (
    <PlaceholderPage
      title={"Terms of Service"}
      description={"Terms of service"}
    />
  );
}
