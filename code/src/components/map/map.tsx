import {
  MapContainer,
  TileLayer,
} from "react-leaflet";
import { LocationMarker } from "@/components/map/location-marker";

export function Map() {
  return (
    <div>
      <MapContainer
        className="h-screen"
        center={[47.5601333, 7.5879957]}
        zoom={17}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
        />
        <LocationMarker />
      </MapContainer>
    </div>
  );
}
