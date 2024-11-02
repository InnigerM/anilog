import { createFileRoute, redirect } from '@tanstack/react-router';
import { Registration } from '@/components/user';
import { USER_LOCAL_STORAGE_KEY, UserResponse } from '@/lib/api/user';

export const Route = createFileRoute('/')({
    component: RouteComponent,
    beforeLoad: () => {
        const userItem = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
        if (userItem) {
            const user = JSON.parse(userItem) as UserResponse;

            if (user && user.email && user.firstName)
                throw redirect({ to: '/map' });
        }
    },
});

function RouteComponent() {
    return <Registration />;
}
