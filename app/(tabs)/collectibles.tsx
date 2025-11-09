// ARCHIVO: app/(tabs)/collectibles.tsx
import React from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    TouchableOpacity, // <-- Volvemos a añadir
    RefreshControl,
    Image,
} from 'react-native';
import { useRouter } from 'expo-router'; // <-- Volvemos a añadir
import { useCollectibles } from '@/src/presentation/hooks/useCollectibles';
import { theme, styles } from '@/src/presentation/styles/globalStyles';
import { Collectible } from '@/src/domain/entities/Collectible';

/**
 * Pantalla que muestra la lista de Cajas (Crates).
 * Consume el Endpoint 2: crates.json
 */
export default function CollectiblesScreen() {
    const { collectibles, loading, error, refreshCollectibles } = useCollectibles();
    const router = useRouter(); // <-- Volvemos a añadir

    // --- VOLVER A AÑADIR LA NAVEGACIÓN ---
    const onCollectiblePress = (item: Collectible) => {
        router.push({
            // Ruta al archivo app/collectibles/[id].tsx
            pathname: "/collectibles/[id]",
            // Pasamos el ID y el Nombre para la pantalla de detalle
            params: { id: item.id, name: item.name },
        });
    };
    // --- FIN ---

    const renderItem = ({ item }: { item: Collectible }) => (
        // --- VOLVER A AÑADIR TouchableOpacity ---
        <TouchableOpacity
            style={styles.card}
            onPress={() => onCollectiblePress(item)}
        >
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
        </TouchableOpacity>
        // --- FIN ---
    );

    if (loading && collectibles.length === 0) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color={theme.primary} />
                <Text style={styles.loadingText}>Cargando Cajas...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity onPress={refreshCollectibles}>
                    <Text style={{ color: theme.primary, marginTop: 10 }}>
                        Reintentar
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* <Text style={styles.title}>Cajas de CS2</Text> */}
            <FlatList
                data={collectibles}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={refreshCollectibles}
                        tintColor={theme.primary}
                        colors={[theme.primary]}
                    />
                }
            />
        </View>
    );
}