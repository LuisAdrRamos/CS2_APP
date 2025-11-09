import { useState, useEffect } from "react";
import { container } from "@/src/di/container";
import { User } from "@/src/domain/entities/User";

/**
 * Hook personalizado (ViewModel) para manejar toda la lógica de autenticación.
 * Las pantallas de la UI (login, register, profile) solo interactuarán con este hook,
 * nunca directamente con los casos de uso o el contenedor.
 */
export const useAuth = () => {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true); // Inicia en true para la carga inicial
    const [error, setError] = useState<string | null>(null);

    /**
     * Efecto para suscribirse a los cambios de estado de Firebase Auth.
     * Esto se ejecuta una vez y mantiene el estado 'user' sincronizado.
     */
    useEffect(() => {
        // Obtenemos el repositorio (o un caso de uso específico) desde el container
        // para acceder a onAuthStateChanged.
        const unsubscribe =
            container.authRepository.onAuthStateChanged((authUser) => {
                setUser(authUser);
                setLoading(false); // Marca como cargado después de la primera verificación
            });

        // Cleanup: Desuscribirse cuando el componente se desmonte
        return () => unsubscribe();
    }, []);

    /**
     * Llama al caso de uso de Registro.
     * Maneja los estados de carga y error.
     */
    const register = async (
        email: string,
        password: string,
        displayName: string
    ): Promise<boolean> => {
        try {
            setLoading(true);
            setError(null);
            // Llama al Caso de Uso desde el contenedor
            const newUser = await container.registerUser.execute(
                email,
                password,
                displayName
            );
            setUser(newUser); // Actualiza el estado local
            return true;
        } catch (err: any) {
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Llama al caso de uso de Actualizar Perfil.
     */
    const updateProfile = async (displayName: string): Promise<boolean> => {
        try {
            if (!user) {
                setError("No estás autenticado.");
                return false;
            }
            setLoading(true);
            setError(null);
            const updatedUser = await container.updateProfile.execute(
                user.id,
                displayName
            );
            setUser(updatedUser); // Actualiza el estado local
            return true;
        } catch (err: any) {
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Llama al caso de uso de Recuperar Contraseña.
     */
    const forgotPassword = async (email: string): Promise<boolean> => {
        try {
            setLoading(true);
            setError(null);
            await container.forgotPassword.execute(email);
            return true; // Éxito (email enviado)
        } catch (err: any) {
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Llama al caso de uso de Login.
     */
    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            setLoading(true);
            setError(null);
            const loggedUser = await container.loginUser.execute(email, password);
            setUser(loggedUser);
            return true;
        } catch (err: any) {
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Llama al caso de uso de Logout.
     */
    const logout = async (): Promise<boolean> => {
        try {
            setLoading(true);
            setError(null);
            await container.logoutUser.execute();
            setUser(null);
            return true;
        } catch (err: any) {
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Exporta el estado y las funciones para que la UI las consuma
    return {
        user,
        loading,
        error,
        register,
        updateProfile,
        forgotPassword,
        login,
        logout,
        isAuthenticated: !!user,
    };
};