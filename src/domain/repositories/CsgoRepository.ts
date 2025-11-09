// ARCHIVO: src/domain/repositories/CsgoRepository.ts
// MODIFICADO: Se cambia la interfaz para el nuevo 3er endpoint
import { Agent } from "../entities/Agent";
import { Collectible } from "../entities/Collectible";
import { Skin } from "../entities/Skin";

export interface CsgoRepository {
    getAgents(): Promise<Agent[]>;
    getCollectibles(): Promise<Collectible[]>;
    getSkins(): Promise<Skin[]>; // <-- NUEVO (Endpoint 3)

    // ELIMINADO
    // getCollectibleById(id: string): Promise<Skin[]>;
}