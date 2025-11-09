import { container } from "@/src/di/container";
import { Agent } from "@/src/domain/entities/Agent";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

/**
 * Hook (ViewModel) para manejar la lógica de la pantalla de Agentes.
 */
export const useAgents = () => {
    // 1. Estados
    const [agents, setAgents] = useState<Agent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 2. Lógica de Carga de Datos
    const fetchAgents = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            // Llamamos al Caso de Uso desde el contenedor
            const fetchedAgents = await container.getAgents.execute();
            setAgents(fetchedAgents);

        } catch (err: any) {
            const message = err.message || "Error al cargar los agentes";
            setError(message);
            Alert.alert("Error", message);
        } finally {
            setLoading(false);
        }
    }, []);

    // 3. Efecto de Carga Inicial (al montar el componente)
    useEffect(() => {
        fetchAgents();
    }, [fetchAgents]); // fetchAgents está en un useCallback, es seguro

    // 4. Exponer el estado y las funciones
    return {
        agents,
        loading,
        error,
        refreshAgents: fetchAgents, // Función para "pull-to-refresh"
    };
};