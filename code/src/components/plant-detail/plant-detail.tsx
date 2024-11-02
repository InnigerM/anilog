import { getPlantById } from '@/lib/api/plant';
import { useSuspenseQuery } from '@tanstack/react-query';

type PlantDetailProps = {
    plantId: string;
};
export default function PlantDetail({ plantId }: PlantDetailProps) {
    const { data: plant } = useSuspenseQuery(getPlantById(plantId));

    return (
        <div className="flex flex-col items-center px-8">
            <img
                src="https://placehold.co/170x254/EEE/FF8B6B"
                width={170}
                height={254}
            />

            <h1>{plant?.name_common}</h1>
            <h2>lat. {plant?.name_latin}</h2>

            <p>{plant?.description_long}</p>
        </div>
    );
}
