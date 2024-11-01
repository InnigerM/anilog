import { MapContainer, TileLayer } from "react-leaflet";
import { LocationMarker } from "@/components/map/location-marker";
import { CollectionMarker } from "@/components/map/collection-marker";

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
        <CollectionMarker lat={47.547679} lng={7.596090} name={"Gemeine Wegwarte"} id={1} />
          <CollectionMarker lat={47.546837} lng={7.598924} name={"Sonnenblume"} id={1} />
          <CollectionMarker lat={47.549101} lng={7.591053} name={"Seerose"} id={1} />
          <CollectionMarker lat={47.547116} lng={7.597547} name={"Cannabis sativa"} id={1} />
          <CollectionMarker lat={47.547801} lng={7.598510} name={"Fetthenne"} id={1} />

      </MapContainer>
    </div>
  );
}
