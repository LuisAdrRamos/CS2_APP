import { User } from "../entities/User";

/**
 * Define el "contrato" (interfaz) que cualquier repositorio de autenticación debe cumplir.
 * La capa de Dominio depende de esta abstracción, no de una implementación concreta.
 */
export interface AuthRepository {

    /**
     * Registra un nuevo usuario con email, contraseña y nombre.
     */
    register(
        email: string,
        password: string,
        displayName: string
    ): Promise<User>;

    /**
     * Inicia sesión con email y contraseña.
     */
    login(email: string, password: string): Promise<User>;

    /**
     * Cierra la sesión del usuario actual.
     */
    logout(): Promise<void>;

    /**
     * Obtiene el usuario actualmente autenticado.
     */
    getCurrentUser(): Promise<User | null>;

    /**
     * Escucha los cambios en el estado de autenticación (login/logout).
     * Devuelve una función para desuscribirse.
     */
    onAuthStateChanged(callback: (user: User | null) => void): () => void;

    /**
     * Actualiza el perfil (displayName) del usuario.
     */
    updateProfile(id: string, displayName: string): Promise<User>;

    /**
     * Envía un email para restablecer la contraseña.
     */
    forgotPassword(email: string): Promise<void>;
}