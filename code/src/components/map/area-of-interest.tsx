import { LatLngExpression } from "leaflet";
import { CircleMarker } from "react-leaflet";

type AreaOfInterestProps = {
  position: LatLngExpression;
  color?: string;
};

export function AreaOfInterest({
  position,
  color = "#abcd12",
}: AreaOfInterestProps) {
  return (
    <>
      <CircleMarker center={position} radius={100} color={color} />
    </>
  );
}
