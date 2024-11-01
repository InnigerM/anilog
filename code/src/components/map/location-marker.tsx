import { Marker, Popup, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import { LatLng } from "leaflet";

export function LocationMarker() {
  const [position, setPosition] = useState<LatLng>(null);
  const map = useMapEvents({
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  useEffect(() => {
    if (map) {
      map.locate();
    }
  }, []);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}
