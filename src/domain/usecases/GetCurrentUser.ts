import { AuthRepository } from "../repositories/AuthRepository";
import { User } from "../entities/User";

/**
 * Caso de Uso para Obtener el Usuario Actual.
 */
export class GetCurrentUser {
    constructor(private authRepository: AuthRepository) {}

    async execute(): Promise<User | null> {
        return this.authRepository.getCurrentUser();
    }
}