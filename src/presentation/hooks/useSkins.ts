// ARCHIVO: src/presentation/hooks/useSkins.ts
// NUEVO: Hook/ViewModel para la nueva pantalla de Skins
import { container } from "@/src/di/container";
import { Skin } from "@/src/domain/entities/Skin";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

/**
 * Hook (ViewModel) para manejar la lógica de la pantalla de Skins.
 */
export const useSkins = () => {
    // 1. Estados
    const [skins, setSkins] = useState<Skin[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 2. Lógica de Carga de Datos
    const fetchSkins = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            // Llamamos al Caso de Uso desde el contenedor
            const fetchedSkins = await container.getSkins.execute();
            setSkins(fetchedSkins);

        } catch (err: any) {
            const message = err.message || "Error al cargar las skins";
            setError(message);
            Alert.alert("Error", message);
        } finally {
            setLoading(false);
        }
    }, []);

    // 3. Efecto de Carga Inicial (al montar el componente)
    useEffect(() => {
        fetchSkins();
    }, [fetchSkins]);

    // 4. Exponer el estado y las funciones
    return {
        skins,
        loading,
        error,
        refreshSkins: fetchSkins, // Función para "pull-to-refresh"
    };
};