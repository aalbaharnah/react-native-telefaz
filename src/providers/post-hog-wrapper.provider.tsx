import { PostHogProvider, PostHogCustomStorage } from 'posthog-react-native'
// import asyncStorage from '@/src/lib/async-storage';

export default function PostHogWrapperProvider({ children }: { children: React.ReactNode }) {
    return (
        <PostHogProvider
            apiKey={process.env.EXPO_PUBLIC_POSTHOG_API_KEY || ''}
            autocapture={false}
            options={{
                host: process.env.EXPO_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
                captureAppLifecycleEvents: true,
                // customStorage: asyncStorage
            }}
        >
            {children}
        </PostHogProvider>
    )
}