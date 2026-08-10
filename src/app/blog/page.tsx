import {
  PlaceholderPage,
  buildPlaceholderMetadata,
} from "@/components/placeholder-page";

export const metadata = buildPlaceholderMetadata(
  "Blog",
  "News, insights, and updates",
);

export default function Page() {
  return (
    <PlaceholderPage
      title={"Blog"}
      description={"News, insights, and updates"}
    />
  );
}
