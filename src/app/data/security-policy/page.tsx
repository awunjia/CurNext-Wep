import {
  PlaceholderPage,
  buildPlaceholderMetadata,
} from "@/components/placeholder-page";

export const metadata = buildPlaceholderMetadata(
  "Security Policy",
  "Security policy",
);

export default function Page() {
  return (
    <PlaceholderPage
      title={"Security Policy"}
      description={"Security policy"}
    />
  );
}
