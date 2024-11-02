import { Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { Button } from "@/components/ui/button";
import { H2 } from "@/components/ui/typography";
import { icon, map, marker } from "leaflet";

type CollectionMarkerProps = {
  lat: number;
  lng: number;
  name: string;
  id: number;
};

export function CollectionMarker({
  lat,
  lng,
  name,
  id,
}: CollectionMarkerProps) {
  function goToObject() {
    console.log("TODO: implement navigation to object detail with id " + id);
  }

  const collectionIcon = icon({
    iconUrl: "/Icon.png",
    iconSize: [50, 90],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
  });

  return lat === null || lng === null ? null : (
    <Marker position={[lat, lng]} icon={collectionIcon}>
      <Popup>
        <H2>{name}</H2>
        <Button onClick={goToObject}>View in collection</Button>
      </Popup>
    </Marker>
  );
}
