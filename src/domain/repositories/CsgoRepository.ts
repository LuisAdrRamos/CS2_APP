// ARCHIVO: src/domain/repositories/CsgoRepository.ts
import { Agent } from "../entities/Agent";
import { Collectible } from "../entities/Collectible";
import { Skin } from "../entities/Skin";

export interface CsgoRepository {
    getAgents(): Promise<Agent[]>;
    getCollectibles(): Promise<Collectible[]>;
    // Volvemos al plan original de 3 endpoints
    getCollectibleById(id: string): Promise<Skin[]>;
}