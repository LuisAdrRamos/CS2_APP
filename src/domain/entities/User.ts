/**
 * Define la estructura de datos pura de un Usuario en nuestro dominio.
 * Es independiente de Firebase o cualquier otra implementación.
 */
export interface User {
    id: string; // UID de Firebase Auth
    email: string; // Email del usuario
    displayName: string; // Nombre para mostrar
    createdAt: Date; // Fecha de registro
}