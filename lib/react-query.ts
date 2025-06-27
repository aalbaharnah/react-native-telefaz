import { QueryClient } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import AsyncStorage from '@react-native-async-storage/async-storage';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            notifyOnChangeProps: 'all',
            gcTime: Infinity,
            refetchOnWindowFocus: true,
        },
    },
});

const persister = createAsyncStoragePersister({
    storage: AsyncStorage,
});

persistQueryClient({
    queryClient,
    persister,
});

export default queryClient;
