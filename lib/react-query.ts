import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            notifyOnChangeProps: 'all',
            gcTime: Infinity,
            refetchOnWindowFocus: true,
        },
    },
});

export default queryClient;
