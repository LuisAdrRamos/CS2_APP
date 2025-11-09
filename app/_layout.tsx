// ARCHIVO: app/_layout.tsx
// MODIFICADO: Se eliminó la pantalla de detalle que daba 404
import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import 'react-native-reanimated';
import { useAuth } from '@/src/presentation/hooks/useAuth';
import { theme, styles } from '@/src/presentation/styles/globalStyles';

export default function RootLayout() {
    const { user, loading: authLoading } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    // Lógica de Protección de Rutas
    useEffect(() => {
        if (authLoading) return;

        // Arregla el error de tipo 'never'
        const inTabsGroup = segments[0] === '(tabs)';
        const inAuthScreen = !!segments.find(s =>
            s === 'login' || s === 'register' || s === 'forgotPassword'
        );

        if (!user && inTabsGroup && !inAuthScreen) {
            router.replace('/(tabs)/login');
        } else if (user && inAuthScreen) {
            // Redirigimos a 'collectibles' (Cajas) como pantalla principal
            router.replace('/(tabs)/collectibles');
        }

    }, [user, segments, authLoading, router]);

    if (authLoading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color={theme.primary} />
            </View>
        );
    }

    return (
        <Stack screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: theme.background }
        }}>
            {/* Registramos el layout de Pestañas */}
            <Stack.Screen name="(tabs)" />

        </Stack>
    );
}