import { Agent } from "../entities/Agent";
import { CsgoRepository } from "../repositories/CsgoRepository";

/**
 * Caso de Uso para obtener todos los agentes.
 */
export class GetAgents {
    constructor(private repository: CsgoRepository) { }

    async execute(): Promise<Agent[]> {
        // Aquí podríamos añadir lógica de negocio, ej:
        // if (user.role !== 'admin') throw new Error('No autorizado');
        // Por ahora, solo llamamos al repositorio.
        return this.repository.getAgents();
    }
}