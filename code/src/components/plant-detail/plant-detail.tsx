import { getPlantById } from '@/lib/api/plant';
import { useSuspenseQuery } from '@tanstack/react-query';
import { H1, H2 } from '@/components/ui/typography';
import { EndangeredLevels } from '../../../model/endangered-level.model';
import { EndangeredLevelComponent } from '@/components/plant-detail/endangered-level';
import { SpecialPlants } from './special-plants';

type PlantDetailProps = {
    plantId: string;
};

export default function PlantDetail({ plantId }: PlantDetailProps) {
    const { data: plant } = useSuspenseQuery(getPlantById(plantId));

    return (
        <div className="flex flex-col items-center px-8 bg-peach-cream pb-16 h-content overflow-scroll">
            <SpecialPlants plantName={plant?.name_latin} />
            <img
                className="mt-6"
                src="https://placehold.co/170x254/EEE/FF8B6B"
                width={170}
                height={254}
            />
            <H1 className="text-hibiscus-orange mt-2 mb-0">
                <span
                    className={`text-hibiscus-orange mr-2 icon-${plant?.type}`}
                ></span>
                {plant?.name_common}
            </H1>
            <p className="text-gray-400">lat. {plant?.name_latin}</p>
            <H2 className="mt-4 text-gray-600">
                <span className="icon-pin mr-2"></span>
                {plant?.native_habitat}
            </H2>
            <div className="fun-fact-box bg-hibiscus-orange opacity-70 p-1 mt-6">
                <div className="fun-fact-box bg-peach-cream px-6 py-4">
                    <H2 className="text-gray-600 w-full text-center">
                        Fun fact
                    </H2>
                    <p className="text-center">{plant?.fun_fact}</p>
                </div>
            </div>
            <div className="mt-8 flex justify-evenly w-full">
                <div className="w-1/4 text-center">
                    <div className="icon-color text-2xl text-hibiscus-orange"></div>
                    <div>{plant?.color}</div>
                </div>
                <div className="w-1/4 text-center">
                    <div className="icon-endangered text-2xl text-hibiscus-orange"></div>
                    <div>
                        {plant?.endangered_level &&
                        EndangeredLevels[plant.endangered_level] ? (
                            <EndangeredLevelComponent
                                endangeredLevel={
                                    EndangeredLevels[plant.endangered_level]
                                }
                            />
                        ) : (
                            'not known'
                        )}
                    </div>
                </div>
                <div className="w-1/4 text-center">
                    <div className="icon-family text-2xl text-hibiscus-orange"></div>
                    <div>{plant?.family}</div>
                </div>
            </div>
            <p className="mt-8">{plant?.description_long}</p>
        </div>
    );
}
