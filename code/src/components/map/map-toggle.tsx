import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

type MapToggleProps = {
    mapType: 'aoi' | 'collection';
    setMapType: (value: 'aoi' | 'collection') => void;
};

export function MapToggle({ mapType, setMapType }: MapToggleProps) {
    return (
        <ToggleGroup
            size="lg"
            className="fixed h-10 right-3 bottom-24 z-[1001] flex-col"
            type="single"
            value={mapType}
            onValueChange={(value: 'aoi' | 'collection') => {
                setMapType(value);
            }}
        >
            <ToggleGroupItem
                className="rounded-full p-5 opacity-40 bg-green-700 text-yellow-400 data-[state=on]:opacity-100 data-[state=on]:bg-green-700 data-[state=on]:text-yellow-400"
                value="aoi"
            >
                A
            </ToggleGroupItem>
            <ToggleGroupItem
                className="rounded-full p-5 opacity-40 bg-green-700 text-yellow-400 data-[state=on]:opacity-100 data-[state=on]:bg-green-700 data-[state=on]:text-yellow-400"
                value="collection"
            >
                C
            </ToggleGroupItem>
        </ToggleGroup>
    );
}
