import { createFileRoute } from "@tanstack/react-router";
import { Map } from "@/components/map";

export const Route = createFileRoute("/map")({
  component: MapComponent,
});

export function MapComponent() {
  return <Map />;
}
