import {
  PlaceholderPage,
  buildPlaceholderMetadata,
} from "@/components/placeholder-page";

export const metadata = buildPlaceholderMetadata(
  "Solutions",
  "Solutions for your industry and use case",
);

export default function Page() {
  return (
    <PlaceholderPage
      title={"Solutions"}
      description={"Solutions for your industry and use case"}
    />
  );
}
