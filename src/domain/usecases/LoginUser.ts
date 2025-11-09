import { AuthRepository } from "../repositories/AuthRepository";
import { User } from "../entities/User";

/**
 * Caso de Uso para Iniciar Sesión.
 * Contiene la lógica de negocio específica para el login.
 */
export class LoginUser {
    constructor(private authRepository: AuthRepository) {}

    /**
     * Ejecuta el caso de uso.
     * @param email Email del usuario.
     * @param password Contraseña del usuario.
     * @returns El usuario autenticado.
     */
    async execute(email: string, password: string): Promise<User> {
        // VALIDACIONES DE NEGOCIO
        if (!email || !password) {
            throw new Error("Email y contraseña son requeridos");
        }
        
        if (!email.includes("@")) {
            throw new Error("Email inválido");
        }
        
        // Llama al repositorio para ejecutar la acción
        return this.authRepository.login(email, password);
    }
}