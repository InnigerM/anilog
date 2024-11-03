import {
    Outlet,
    createRootRoute,
    redirect,
    useRouterState,
} from '@tanstack/react-router';
import '../index.css';
import Navigation from '@/components/navigation/navigation';
import { View } from '@/lib/types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CameraProvider } from '@/lib/providers/camera-provider';
import { Toaster } from 'sonner';
import { USER_LOCAL_STORAGE_KEY } from '@/lib/api/user';
import TopBar from '@/components/top-bar/top-bar';

const queryClient = new QueryClient();

export const Route = createRootRoute({
    component: RootComponent,
    beforeLoad: (context) => {
        const userItem = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
        if (!userItem && context.location.href !== '/') {
            console.log('no auth present: redirecting to home');
            throw redirect({ to: '/' });
        }
    },
});

function RootComponent() {
    const router = useRouterState();

    const view =
        router.location.pathname === '/'
            ? 'MAP'
            : (router.location.pathname
                  .replace(/^\/+/, '')
                  .split('/')[0]
                  .toUpperCase() as View);

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <CameraProvider>
                    <TopBar variant={view} />
                    <Outlet />
                    <Navigation variant={view} />
                    <Toaster />
                </CameraProvider>
            </QueryClientProvider>
        </>
    );
}
