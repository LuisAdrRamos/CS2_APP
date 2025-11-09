// ARCHIVO: src/domain/usecases/GetSkins.ts
// NUEVO: Caso de uso para el 3er endpoint
import { Skin } from "../entities/Skin";
import { CsgoRepository } from "../repositories/CsgoRepository";

/**
 * Caso de Uso para obtener todas las skins.
 */
export class GetSkins {
    constructor(private repository: CsgoRepository) { }

    async execute(): Promise<Skin[]> {
        return this.repository.getSkins();
    }
}