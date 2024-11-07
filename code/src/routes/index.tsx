import { createFileRoute, redirect } from '@tanstack/react-router';
import { getUserFromLocalStorage } from '@/lib/utils';
import {Splash} from "@/components/splash";

export const Route = createFileRoute('/')({
    component: RouteComponent,
    beforeLoad: () => {
        const user = getUserFromLocalStorage();

        if (user && user.email && user.firstName)
            throw redirect({ to: '/map' });
    },
});

function RouteComponent() {
    return <Splash />;
}
