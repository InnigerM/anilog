import { Marker, Popup, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import { LatLng } from "leaflet";

export function LocationMarker() {
  const [position, setPosition] = useState<LatLng>();

  const map = useMapEvents({
    locationfound(e) {
      console.log(e);
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  useEffect(() => {
    if (map) {
      map.locate();
    }
  }, []);

  return !position ? (
    <div className="absolute top-0 left-0 right-0 z-[1000] flex items-center justify-center">
      <span>Loading your location...</span>
    </div>
  ) : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}
