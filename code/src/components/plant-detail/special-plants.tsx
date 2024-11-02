import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useSpecialPlantMutation } from '@/lib/api/special-plants';
import { USER_LOCAL_STORAGE_KEY } from '@/lib/api/user';

const THE_TEAPOT = '🫖';
const FOUR_TWENTY = '420';

interface SpecialPlantsProps {
    plantName?: string | null;
}

export const SpecialPlants: React.FC<SpecialPlantsProps> = ({ plantName }) => {
    const [toDisplay, setToDisplay] = React.useState<string | null>(null);
    const specialPlantMutation = useSpecialPlantMutation();

    useEffect(() => {
        switch (plantName) {
            case 'Camellia sinensis':
                setToDisplay(THE_TEAPOT);
                saveSpecialPlantToDb();
                break;
            case 'Cannabis':
            case 'Cannabis sativa':
            case 'Cannabis indica':
                setToDisplay(FOUR_TWENTY);
                saveSpecialPlantToDb();
                break;
            default:
                setToDisplay(null);
        }
    }, [plantName]);

    const saveSpecialPlantToDb = async () => {
        const userString = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
        if (userString && plantName) {
            const user = JSON.parse(userString);
            await specialPlantMutation.mutateAsync({
                user_name: user.firstName,
                plant: plantName,
            });
        }
    };

    const close = () => {
        setToDisplay(null);
    };

    return (
        <>
            {!!toDisplay && (
                <div className="absolute top-0 bottom-0 left-0 right-0 z-50 flex justify-center items-center bg-stone-900 opacity-80 flex-col gap-y-10">
                    <span className="text-8xl animate-bounce text-white">
                        {toDisplay}
                    </span>
                    <Button className="bg-white" onClick={close}>
                        I had my fun (close)
                    </Button>
                </div>
            )}
        </>
    );
};
