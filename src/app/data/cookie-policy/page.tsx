import {
  PlaceholderPage,
  buildPlaceholderMetadata,
} from "@/components/placeholder-page";

export const metadata = buildPlaceholderMetadata(
  "Cookie Policy",
  "Cookie policy",
);

export default function Page() {
  return (
    <PlaceholderPage
      title={"Cookie Policy"}
      description={"Cookie policy"}
    />
  );
}
