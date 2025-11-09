// ARCHIVO: app/collectibles/[id].tsx
import React from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, TouchableOpacity, RefreshControl } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useCollectibleDetail } from '@/src/presentation/hooks/useCollectibleDetail';
import { theme, styles } from '@/src/presentation/styles/globalStyles';
import { Skin } from '@/src/domain/entities/Skin';

/**
 * Pantalla de Detalle: Muestra las skins dentro de una caja.
 * Consume el Endpoint 3: crates/{id}.json
 */
export default function CollectibleDetailScreen() {
    // Obtenemos el 'id' y 'name' que pasamos por parámetros
    const { id, name } = useLocalSearchParams<{ id: string, name?: string }>();
    const { skins, loading, error, refreshDetail } = useCollectibleDetail(id);

    // Renderiza cada skin en la lista
    const renderItem = ({ item }: { item: Skin }) => (
        <View style={styles.card}>
            <Image
                source={{ uri: item.image }}
                style={styles.cardImage}
                resizeMode="contain"
            />
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                {item.rarity && (
                    <Text
                        style={[
                            styles.cardRarity,
                            { color: item.rarity?.color || theme.textSecondary },
                        ]}
                    >
                        {item.rarity.name}
                    </Text>
                )}
            </View>
        </View>
    );

    // --- Pantalla de Carga ---
    if (loading && skins.length === 0) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color={theme.primary} />
                <Text style={styles.loadingText}>Cargando skins...</Text>
            </View>
        );
    }

    // --- Pantalla de Error ---
    if (error) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity onPress={refreshDetail}>
                    <Text style={{ color: theme.primary, marginTop: 10 }}>
                        Reintentar
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    // --- Pantalla de Contenido ---
    return (
        <View style={styles.container}>
            {/* Título dinámico en el Header de la Stack */}
            <Stack.Screen options={{ title: name || 'Detalle' }} />
            
            <FlatList
                data={skins}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                // Usamos un Header para mostrar el título dentro de la lista
                ListHeaderComponent={
                    <Text style={styles.title}>{name || 'Contenido'}</Text>
                }
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={refreshDetail}
                        tintColor={theme.primary}
                        colors={[theme.primary]}
                    />
                }
            />
        </View>
    );
}