import {
  PlaceholderPage,
  buildPlaceholderMetadata,
} from "@/components/placeholder-page";

export const metadata = buildPlaceholderMetadata(
  "Privacy Policy",
  "Privacy policy",
);

export default function Page() {
  return (
    <PlaceholderPage
      title={"Privacy Policy"}
      description={"Privacy policy"}
    />
  );
}
