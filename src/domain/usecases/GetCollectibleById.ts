// ARCHIVO: src/domain/usecases/GetCollectibleById.ts
import { Skin } from "../entities/Skin";
import { CsgoRepository } from "../repositories/CsgoRepository";

export class GetCollectibleById {
    constructor(private repository: CsgoRepository) { }

    async execute(id: string): Promise<Skin[]> {
        if (!id) {
            throw new Error("ID es requerido");
        }
        return await this.repository.getCollectibleById(id);
    }
}