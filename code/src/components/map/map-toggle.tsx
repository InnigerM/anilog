import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

type MapToggleProps = {
    mapType: 'aoi' | 'collection';
    setMapType: (value: 'aoi' | 'collection') => void;
};

export function MapToggle({ mapType, setMapType }: MapToggleProps) {
    return (
        <ToggleGroup
            size="lg"
            className="fixed h-10 right-5 bottom-36 z-[1001] flex-col"
            type="single"
            value={mapType}
            onValueChange={(value: 'aoi' | 'collection') => {
                setMapType(value);
            }}
        >
            <ToggleGroupItem
                className="rounded-full text-3xl h-16 p-3 opacity-50 bg-blossom-pink text-honeysuckle-yellow data-[state=on]:opacity-100 data-[state=on]:bg-blossom-pink data-[state=on]:text-honeysuckle-yellow"
                value="aoi"
                disabled={mapType === 'aoi'}
            >
                <div className="icon-map"></div>
            </ToggleGroupItem>
            <ToggleGroupItem
                className="rounded-full text-3xl h-16 p-3 opacity-50 bg-blossom-pink text-honeysuckle-yellow data-[state=on]:opacity-100 data-[state=on]:bg-blossom-pink data-[state=on]:text-honeysuckle-yellow"
                value="collection"
                disabled={mapType === 'collection'}
            >
                <div className="icon-star-pin"></div>
            </ToggleGroupItem>
        </ToggleGroup>
    );
}
