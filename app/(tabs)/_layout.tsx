// ARCHIVO: app/(tabs)/_layout.tsx
import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/src/presentation/styles/globalStyles';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: theme.primary,
                tabBarInactiveTintColor: theme.textSecondary,
                tabBarStyle: {
                    backgroundColor: theme.card,
                    borderTopColor: theme.border,
                },
                headerStyle: {
                    backgroundColor: theme.card,
                },
                headerTintColor: theme.text,
            }}
        >
            {/* Pestaña 1: "Cajas" (Usa el archivo collectibles.tsx) */}
            <Tabs.Screen
                name="collectibles" // Archivo: collectibles.tsx
                options={{
                    title: 'Cajas', // Mostramos "Cajas"
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="cube-outline" size={28} color={color} />
                    ),
                }}
            />

            {/* Pestaña 2: Agentes */}
            <Tabs.Screen
                name="agents" // Archivo: agents.tsx
                options={{
                    title: 'Agentes',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="people-outline" size={28} color={color} />
                    ),
                }}
            />

            {/* Pestaña 3: Perfil */}
            <Tabs.Screen
                name="profile" // Archivo: profile.tsx
                options={{
                    title: 'Perfil',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="person-circle-outline" size={28} color={color} />
                    ),
                }}
            />

            {/* --- RUTAS OCULTAS --- */}
            <Tabs.Screen name="login" options={{ href: null, headerShown: false, tabBarStyle: { display: 'none' } }} />
            <Tabs.Screen name="register" options={{ href: null, headerShown: false, tabBarStyle: { display: 'none' } }} />
            <Tabs.Screen name="forgotPassword" options={{ href: null, headerShown: false, tabBarStyle: { display: 'none' } }} />
        </Tabs>
    );
}