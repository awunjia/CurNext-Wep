import {
  PlaceholderPage,
  buildPlaceholderMetadata,
} from "@/components/placeholder-page";

export const metadata = buildPlaceholderMetadata(
  "Events",
  "Upcoming events, webinars, and meetups",
);

export default function Page() {
  return (
    <PlaceholderPage
      title="Events"
      description="Upcoming events, webinars, and meetups"
    />
  );
}
