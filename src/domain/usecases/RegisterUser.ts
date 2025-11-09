import { AuthRepository } from "../repositories/AuthRepository";
import { User } from "../entities/User";

/**
 * Caso de Uso para Registrar un nuevo usuario.
 * Contiene las validaciones de negocio para el registro.
 */
export class RegisterUser {
    constructor(private authRepository: AuthRepository) {}

    async execute(
        email: string,
        password: string,
        displayName: string
    ): Promise<User> {
        
        // VALIDACIONES DE NEGOCIO
        if (!email || !password || !displayName) {
            throw new Error("Todos los campos son requeridos");
        }

        if (password.length < 6) {
            throw new Error("La contraseña debe tener al menos 6 caracteres");
        }
        
        if (displayName.trim().length < 2) {
            throw new Error("El nombre debe tener al menos 2 caracteres");
        }

        // Validación de formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error("El formato del email no es válido");
        }
        
        // Llama al repositorio
        return this.authRepository.register(email, password, displayName);
    }
}