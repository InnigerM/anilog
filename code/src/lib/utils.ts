import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Database } from 'database.types';
import { createClient } from '@supabase/supabase-js';
import { USER_LOCAL_STORAGE_KEY, UserResponse } from './api/user';
import { LatLng } from 'leaflet';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const supabase = createClient<Database>(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY,
);

export function getUserFromLocalStorage() {
    const userItem = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
    if (!userItem) return null;

    return JSON.parse(userItem) as UserResponse;
}

export async function getCurrentPosition(
    callback: (position: LatLng | null) => Promise<void>,
) {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                console.log(
                    `current position is ${position}, executing callback.`,
                );
                await callback(
                    new LatLng(
                        position.coords.latitude,
                        position.coords.longitude,
                    ),
                );
            },
            async (error) => {
                console.log(error);
                // Execute callback on error, because location is not needed for a proper scan
                await callback(null);
            },
            { timeout: 5000 },
        );
    } else {
        console.log('no access to geolocation, executing callback');
        await callback(null);
    }
}
