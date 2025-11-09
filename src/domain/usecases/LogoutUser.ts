import { AuthRepository } from "../repositories/AuthRepository";

/**
 * Caso de Uso para Cerrar Sesión.
 */
export class LogoutUser {
    constructor(private authRepository: AuthRepository) {}

    async execute(): Promise<void> {
        return this.authRepository.logout();
    }
}