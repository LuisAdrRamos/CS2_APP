// ARCHIVO: app/(tabs)/agents.tsx
import React from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    RefreshControl,
    Image,
    ScrollView, // Importamos ScrollView para la descripción
} from 'react-native';
import { useAgents } from '@/src/presentation/hooks/useAgents';
import { theme, styles } from '@/src/presentation/styles/globalStyles';
import { Agent } from '@/src/domain/entities/Agent';

/**
 * Pantalla que muestra la lista de Agentes.
 * Consume el Endpoint 1: agents.json
 */
export default function AgentsScreen() {
    const { agents, loading, error, refreshAgents } = useAgents();

    const renderItem = ({ item }: { item: Agent }) => (
        // Lo dejamos como View, ya que no tiene pantalla de detalle
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
                {/* Añadimos la descripción en un ScrollView por si es larga */}
                <ScrollView style={{maxHeight: 60, marginTop: 5}}>
                    <Text style={styles.cardSubtitle}>{item.description}</Text>
                </ScrollView>
            </View>
        </View>
    );

    if (loading && agents.length === 0) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color={theme.primary} />
                <Text style={styles.loadingText}>Cargando Agentes...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity onPress={refreshAgents}>
                    <Text style={{ color: theme.primary, marginTop: 10 }}>
                        Reintentar
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* <Text style={styles.title}>Agentes</Text> */}
            <FlatList
                data={agents}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={refreshAgents}
                        tintColor={theme.primary}
                        colors={[theme.primary]}
                    />
                }
            />
        </View>
    );
}