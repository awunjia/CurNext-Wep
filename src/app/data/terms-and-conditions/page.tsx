import {
  PlaceholderPage,
  buildPlaceholderMetadata,
} from "@/components/placeholder-page";

export const metadata = buildPlaceholderMetadata(
  "Terms & Conditions",
  "Terms and conditions",
);

export default function Page() {
  return (
    <PlaceholderPage
      title={"Terms & Conditions"}
      description={"Terms and conditions"}
    />
  );
}
