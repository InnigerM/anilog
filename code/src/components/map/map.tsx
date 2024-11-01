import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";

export function Map() {

  return (
    <div>
      <MapContainer
        className="h-screen"
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer

          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
        />
      </MapContainer>
    </div>
  );
}
