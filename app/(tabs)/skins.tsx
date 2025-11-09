// ARCHIVO: app/(tabs)/skins.tsx
// NUEVO: Esta pantalla consume el 3er endpoint (skins.json)
import React from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    RefreshControl,
    Image,
    ScrollView,
} from 'react-native';
import { useSkins } from '../../src/presentation/hooks/useSkins';
import { theme, styles } from '../../src/presentation/styles/globalStyles';
import { Skin } from '../../src/domain/entities/Skin';

/**
 * Pantalla que muestra la lista de Skins.
 * Consume el Endpoint 3: skins.json
 */
export default function SkinsScreen() {
    const { skins, loading, error, refreshSkins } = useSkins();

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
                {/* Mostramos el nombre del arma (si existe) */}
                {item.weapon && (
                    <Text style={styles.cardSubtitle}>{item.weapon}</Text>
                )}
            </View>
        </View>
    );

    if (loading && skins.length === 0) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color={theme.primary} />
                <Text style={styles.loadingText}>Cargando Skins...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity onPress={refreshSkins}>
                    <Text style={{ color: theme.primary, marginTop: 10 }}>
                        Reintentar
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={skins}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={refreshSkins}
                        tintColor={theme.primary}
                        colors={[theme.primary]}
                    />
                }
            />
        </View>
    );
}