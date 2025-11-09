import { Collectible } from "../entities/Collectible";
import { CsgoRepository } from "../repositories/CsgoRepository";

/**
 * Caso de Uso para obtener todas las colecciones.
 */
export class GetCollectibles {
    constructor(private repository: CsgoRepository) { }

    async execute(): Promise<Collectible[]> {
        return this.repository.getCollectibles();
    }
}