import { createFileRoute, redirect } from '@tanstack/react-router';
import { Registration } from '@/components/user';
import { getUserFromLocalStorage } from '@/lib/utils';

export const Route = createFileRoute('/')({
    component: RouteComponent,
    beforeLoad: () => {
        const user = getUserFromLocalStorage();

        if (user && user.email && user.firstName)
            throw redirect({ to: '/map' });
    },
});

function RouteComponent() {
    return <Registration />;
}
