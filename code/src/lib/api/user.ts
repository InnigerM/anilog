import { supabase } from '@/lib/utils';
import {
    queryOptions,
    useMutation,
    UseMutationOptions,
    useQueryClient,
} from '@tanstack/react-query';
import { Database } from 'database.types';

export const USER_LOCAL_STORAGE_KEY = 'user';

export const getUserByEmail = (email: string) =>
    queryOptions({
        queryKey: ['user', email],
        queryFn: async () => {
            const { data, error, count } = await supabase
                .from('user')
                .select('*')
                .eq('email', email)
                .single();

            console.log(data, error, count);

            return data;
        },
    });

export type CreateUserRequest = Database['public']['Tables']['user']['Insert'];
export type UserResponse = Database['public']['Tables']['user']['Row'];

export function useCreateUserMutation(
    opts?: UseMutationOptions<UserResponse | null, Error, CreateUserRequest>,
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (user) => {
            const { data, error } = await supabase
                .from('user')
                .insert([user])
                .select()
                .single();

            return data;
        },
        onSuccess: (user) => {
            localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
        },
        onError: () => {},
        ...opts,
    });
}
