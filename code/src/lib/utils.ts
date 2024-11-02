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

export function getCurrentPosition(
    callback: (position: LatLng | null) => void,
) {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            callback(
                new LatLng(position.coords.latitude, position.coords.longitude),
            );
        });
    } else {
        console.log('no access to geolocation');
        callback(null);
    }
}
