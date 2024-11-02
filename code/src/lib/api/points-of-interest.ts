import { supabase } from '@/lib/utils';
import { queryOptions } from '@tanstack/react-query';
import { Database } from 'database.types';
import { LatLng } from 'leaflet';

export type AreaData = Pick<
    Database['public']['Tables']['areasOfInterest']['Row'],
    'center' | 'name' | 'color'
> & {
    center: {
        coordinates: LatLng;
    };
};

export const getAreasOfInterest = () =>
    queryOptions({
        queryKey: ['areasOfInterest'],
        queryFn: async () => {
            const { data } = await supabase
                .from('areasOfInterest')
                .select('center, name, color');

            if (data) {
                const result: AreaData[] = data.map((area) => ({
                    ...area,
                    center: {
                        coordinates: new LatLng(
                            (area.center as any).coordinates[0],
                            (area.center as any).coordinates[1],
                        ),
                    },
                }));

                return result;
            }

            return null;
        },
    });
