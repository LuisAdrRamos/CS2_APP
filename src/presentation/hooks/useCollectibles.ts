import { container } from "@/src/di/container";
import { Collectible } from "@/src/domain/entities/Collectible";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

/**
 * Hook (ViewModel) para manejar la lógica de la pantalla de Coleccionables.
 */
export const useCollectibles = () => {
    // 1. Estados
    const [collectibles, setCollectibles] = useState<Collectible[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 2. Lógica de Carga de Datos
    const fetchCollectibles = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            // Llamamos al Caso de Uso desde el contenedor
            const fetchedCollectibles = await container.getCollectibles.execute();
            setCollectibles(fetchedCollectibles);

        } catch (err: any) {
            const message = err.message || "Error al cargar los coleccionables";
            setError(message);
            Alert.alert("Error", message);
        } finally {
            setLoading(false);
        }
    }, []);

    // 3. Efecto de Carga Inicial
    useEffect(() => {
        fetchCollectibles();
    }, [fetchCollectibles]);

    // 4. Exponer el estado y las funciones
    return {
        collectibles,
        loading,
        error,
        refreshCollectibles: fetchCollectibles,
    };
};